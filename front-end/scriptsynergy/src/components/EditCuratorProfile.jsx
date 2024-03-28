import React from "react";
import EditCuratorProfileForm from "./EditCuratorProfileForm";
import APIManager from "../APIHandler/APIManager";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditCuratorProfile() {
  const { state } = useLocation();

  const handleSubmit = async ({
    username,
    email,
    professionalBio,
    hourlyRate,
    expertise,
    paymentId,
  }) => {
    try {
      let responseBody = {
        name: username,
        email: email,
        professionalBio: professionalBio,
        hourlyRate: hourlyRate,
        expertise: expertise,
        paymentId: paymentId,
      };
      let response = await APIManager.updateCuratorProfile(responseBody);
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        toast.success("Profile Updated Successfully")
      } else {
        toast.error(response_json["data"]["message"]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };
  return (
    <div>
      <EditCuratorProfileForm
        curatorName={state["name"]}
        curatorEmail={state["email"]}
        curatorProfessionalBio={state["professionalBio"]}
        curatorHourlyRate={state["hourlyRate"]}
        curatorExpertise={state["expertise"]}
        curatorPaymentId={state["paymentId"]}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
