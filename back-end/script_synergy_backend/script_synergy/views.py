from traceback import print_tb

from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR
from script_synergy.exceptions import (
    SynergyInvalidPasswordException,
    SynergyBaseException,
    SynergyNoSuchUserFoundException,
    SynergyInvalidRoleException,
)
from script_synergy.models import Curator, Writer, WriterDocuments, Notifications
from script_synergy.constants import INTERNAL_SERVER_ERROR_MESSAGE, Roles
from script_synergy.utils import SynergyAuthentication
import requests
from script_synergy_backend import settings


class LoginAPIView(APIView):
    def post(self, request: Request):
        try:
            data = request.data
            email = data["userId"]
            password = data["userPass"]
            role = data["role"]  # Get the role field from the incoming data
            user = None
            if role == Roles.WRITER:
                user = Writer.fetch_writer_based_on_email(email=email)
                # print("Writer found in database:", user.email)
            elif role == Roles.CURATOR:
                user = Curator.fetch_curator_based_on_email(email=email)
                # print("Curator found in database:", user.email)
            # Check if the password matches
            if user is None:
                raise SynergyNoSuchUserFoundException(email=email)
            elif user.validate_password(
                password=password
            ):  # Assuming passwords are stored in plaintext
                # Generate JWT token
                token = user.create_new_jwt_token()
                return Response(
                    data={
                        "status": "OK",
                        "data": {"token": token, "message": "Successful Login"},
                    }
                )
            else:
                raise SynergyInvalidPasswordException()

        except SynergyBaseException as e:
            return Response(data={"status": "ERROR", "data": {"message": e.message}})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SignUpView(APIView):
    def post(self, request: Request):
        try:
            data = request.data
            email = data.get("email")
            password = data.get("password")
            role = data.get("role")
            # Check the role and save data accordingly
            if role == Roles.WRITER:
                user = Writer.create_new_writer(email=email, password=password)
            elif role == Roles.CURATOR:
                user = Curator.create_new_curator(email=email, password=password)
            else:
                # Handle invalid role
                raise SynergyInvalidRoleException(role=role)
            return Response(
                data={
                    "status": "OK",
                    "data": {
                        "token": user.create_new_jwt_token(),
                        "message": "Successful User Registrations",
                    },
                }
            )
        except SynergyBaseException as e:
            return Response(data={"status": "ERROR", "data": {"message": e.message}})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CuratorUserAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def get(self, request):
        try:
            resp = request.user.fetch_curator_details()
            return Response(data={"status": "OK", "data": resp})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request: Request):
        try:
            data = request.data
            name = data["name"]
            email = data["email"]
            professional_bio = data["professionalBio"]
            hourly_rate = data["hourlyRate"]
            expertise = data["expertise"]
            payment_id = data["paymentId"]
            request.user.update_profile_details(
                name=name,
                email=email,
                professional_bio=professional_bio,
                hourly_rate=hourly_rate,
                expertise=expertise,
                payment_id=payment_id,
            )
            resp = request.user.fetch_curator_details()
            return Response(data={"status": "OK", "data": resp})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ValidateJWTTokenAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def get(self, request: Request):
        return Response(data={"status": "OK"})


class SaveWriterDocumentTextAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    # Writer should only access this view
    def post(self, request: Request):
        try:
            data = request.data
            editor_content = data["editor_content"]
            file_name = data["file_name"]
            WriterDocuments.store_writers_text_document(
                writer=request.user, edited_content=editor_content, file_name=file_name
            )
            return Response(
                data={"status": "OK", "data": {"message": "File saved successfully"}}
            )
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request: Request):
        try:
            data = request.data
            editor_content = data["editor_content"]
            document_id = data["document_id"]
            WriterDocuments.update_writers_text_document(
                document_id=document_id, edited_content=editor_content
            )
            return Response(
                data={"status": "OK", "data": {"message": "File saved successfully"}}
            )
        except Exception:
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UploadWriterPDFDocumentAPIView(APIView):
    authentication_classes = [SynergyAuthentication]
    parser_classes = (MultiPartParser, FormParser)

    # Writer should only access this view
    def post(self, request: Request):
        try:
            file = request.data
            WriterDocuments.store_writers_pdf_document(
                writer=request.user, file_name=file["name"], file=file["file"]
            )
            return Response(
                data={"status": "OK", "data": {"message": "File saved successfully"}}
            )
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class WritersDocumentsListAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    # Writer should only access this view
    def get(self, request: Request):
        try:
            if isinstance(request.user, Writer):
                resp = WriterDocuments.fetch_all_the_documents(writer=request.user)
            else:
                resp = []
            return Response(data={"status": "OK", "data": resp})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class WriterDocumentPreSignedDocumentURLAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def get(self, request, document_id: int):
        try:
            document = WriterDocuments.get_writer_document_by_id(
                primary_key=document_id
            )
            url = document.get_presigned_url()
            return Response(data={"status": "OK", "data": {"url": url}})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CuratorsListAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def get(self, request):
        try:
            resp = Curator.fetch_all_curators()
            return Response(data={"status": "OK", "data": resp})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SendCuratorInvitationAPIview(APIView):
    authentication_classes = [SynergyAuthentication]

    def post(self, request: Request):
        try:
            writer = request.user
            if isinstance(writer, Writer):
                data = request.data
                curator_id = data["curatorId"]
                document_id = data["documentId"]
                message = data["message"]
                Notifications.create_new_instance(
                    writer,
                    curator_id=curator_id,
                    document_id=document_id,
                    message=message,
                )
                return Response(
                    data={"status": "OK", "data": {"message": "Successfully Invited"}}
                )
            else:
                raise Exception("Invalid Permission for the user")
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CuratorNotificationDashboardAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def get(self, request: Request):
        try:
            resp = Notifications.fetch_curator_dashboard_response(curator=request.user)
            return Response(data={"status": "OK", "data": resp})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CuratorAcceptAndDeclineInvitationAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def post(self, request: Request):
        try:
            data = request.data
            notification_id = data["notificationId"]
            invitation_accepted = data["invitationAccepted"]

            Notifications.accept_or_decline_invitations(
                notification_id=notification_id,
                invitation_accepted=invitation_accepted,
                curator=request.user,
            )

            return Response(
                data={"status": "OK", "data": {"message": "Invitation Status Updated"}}
            )
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UpdateCuratorFeedbackAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def put(self, request: Request):
        try:
            data = request.data
            notification_id = data["notificationId"]
            feedback = data["feedback"]
            Notifications.update_curator_feedback(
                notification_id=notification_id, feedback=feedback, curator=request.user
            )

            return Response(
                data={"status": "OK", "data": {"message": "Invitation Status Updated"}}
            )
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class WriterNotificationDashboardAPIView(APIView):
    authentication_classes = [SynergyAuthentication]

    def get(self, request: Request):
        try:
            resp = Notifications.fetch_writer_dashboard_response(writer=request.user)
            return Response(data={"status": "OK", "data": resp})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


class WriterAIHelperAPIView(APIView):
    def post(self, request: Request):
        try:
            data = request.data
            text = data["text"]
            payload = {"inputs": text}
            url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
            headers = {"Authorization": settings.AI_TOKEN}
            resp = requests.post(url, headers=headers, json=payload)
            output = resp.json()
            opt_resp = output[0]["generated_text"].split("\n")[-1]
            return Response(data={"status": "OK", "data": opt_resp})
        except Exception as e:
            print_tb(e.__traceback__)
            print(e.__str__())
            return Response(
                data={
                    "status": "ERROR",
                    "data": {"message": INTERNAL_SERVER_ERROR_MESSAGE},
                },
                status=HTTP_500_INTERNAL_SERVER_ERROR,
            )


def welcome(request):
    return HttpResponse("Welcome to the Django server.")


def test_api(request):
    return HttpResponse("successful test-api test.")
