import React from 'react'
import CuratorFeedbackForm from './CuratorFeedbackForm'
import { useLocation } from 'react-router-dom'
import APIManager from '../APIHandler/APIManager';
import { toast } from 'react-toastify';

export default function CuratorFeedback() {
  const {state} = useLocation()
  console.log(state)
  const handleSubmit = async({feedback}) => {
    const requestBody = {
      notificationId: state["notificationId"],
      feedback:  feedback
    };
    try {
      let response = await APIManager.updateCuratorFeedback(requestBody)
      let response_json = await response.json()
      if(response_json["status"]=== "OK"){
        toast.success(response_json["data"]["message"]);
      }else{
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong we are looking into")
    }
  };

  return (
    <div>
      <CuratorFeedbackForm handleSubmit={handleSubmit} documentId={state["documentId"]} documentName={state["documentName"]}/>
    </div>
  )
}
