from django.urls import path
from script_synergy.views import (
    LoginAPIView,
    SignUpView,
    ValidateJWTTokenAPIView,
    WritersDocumentsListAPIView,
    WriterDocumentPreSignedDocumentURLAPIView,
    CuratorsListAPIView,
    welcome,
    test_api,
    SaveWriterDocumentTextAPIView,
    SendCuratorInvitationAPIview,
    CuratorNotificationDashboardAPIView,
    CuratorAcceptAndDeclineInvitationAPIView,
    UpdateCuratorFeedbackAPIView,
    WriterNotificationDashboardAPIView,
    CuratorUserAPIView,
    UploadWriterPDFDocumentAPIView, WriterAIHelperAPIView,
)

urlpatterns = [
    path("", welcome, name="welcome"),
    path("validate-token/", ValidateJWTTokenAPIView.as_view(), name="validate_token"),
    path(
        "save_editor_text/",
        SaveWriterDocumentTextAPIView.as_view(),
        name="save_editor_text",
    ),
    path(
        "upload_editor_pdf/",
        UploadWriterPDFDocumentAPIView.as_view(),
        name="upload_editor_pdf",
    ),
    path(
        "writer-documents/",
        WritersDocumentsListAPIView.as_view(),
        name="writers_documents",
    ),
    path(
        "writer-documents-presigned-url/<int:document_id>/",
        WriterDocumentPreSignedDocumentURLAPIView.as_view(),
        name="writers_document_presigned_url",
    ),
    path("all-curators/", CuratorsListAPIView.as_view(), name="curators_list"),
    path(
        "send-curator-invitaion/",
        SendCuratorInvitationAPIview.as_view(),
        name="send_curator_invitation",
    ),
    path(
        "curator-notification-dashboard/",
        CuratorNotificationDashboardAPIView.as_view(),
        name="curator_notification_dashboard",
    ),
    path(
        "curator-accept-decline-invitations/",
        CuratorAcceptAndDeclineInvitationAPIView.as_view(),
        name="curator_accept_decline_invitation",
    ),
    path(
        "update-curator-feedback/",
        UpdateCuratorFeedbackAPIView.as_view(),
        name="update_curator_feedback",
    ),
    path(
        "writer-notification-dashboard/",
        WriterNotificationDashboardAPIView.as_view(),
        name="writer_notification_dashboard",
    ),
    path(
        "curator-profile/",
        CuratorUserAPIView.as_view(),
        name="curator_profile",
    ),
    path(
        "generate-text/",
        WriterAIHelperAPIView.as_view(),
        name="generate_text",
    ),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("signup/", SignUpView.as_view(), name="signup"),
    path("test-api/", test_api, name="test_api"),
]
