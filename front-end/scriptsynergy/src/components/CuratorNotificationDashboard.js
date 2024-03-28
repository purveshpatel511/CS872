import React, { useState } from "react"
import APIManager from "../APIHandler/APIManager"
import { toast } from "react-toastify"
import { useEffect } from "react"
import CuratedDocumentCuratorNotification from "./CuratedDocumentCuratorNotification"
import DeclinedInvitationCuratorNotification from "./DeclinedInvitationCuratorNotification"
import PendingInvitaionCuratorNotification from "./PendingInvitaionCuratorNotification"
import PendingCurationCuratorNotification from "./PendingCurationCuratorNotification"
import NotificationCard from "./NotificationCard"

export default function CuratorNotificationDashboard() {
  const [notifications, setNotifications] = useState({
    pendingInvitations: [],
    pendingCurations: [],
    declinedInvitations: [],
    curatedDocuments: [],
  })
  const fetchCuratorNotificationAPICall = async () => {
    try {
      let response = await APIManager.fetchCuratorNotifications()
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        setNotifications(() => response_json["data"])
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong!!")
    }
  }
  useEffect(() => {
    fetchCuratorNotificationAPICall()
  }, [])

  const acceptOrDeclineInvitations = async (invitationAccepted, notificationId) => {
    try {
      let data = {
        notificationId: notificationId,
        invitationAccepted: invitationAccepted,
      }
      let response = await APIManager.curatorAcceptOrDeclineInvitations(data)
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        toast.success(response_json["data"]["message"])
        fetchCuratorNotificationAPICall()
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong!!")
    }
  }
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div class="col-lg-12 col-12 text-center">
            {notifications["pendingInvitations"].length ? <h3 class="mb-4">Pending Invitaions</h3> : null}
          </div>
          {notifications["pendingInvitations"].map((pendingInvitation, i) => (
            <NotificationCard
              data={pendingInvitation}
              key={i}
              type="pendingInvitations"
              acceptOrDeclineInvitations={acceptOrDeclineInvitations}
            />
          ))}
          <div class="col-lg-12 col-12 text-center">
            {notifications["pendingCurations"].length ? <h3 class="mb-4">Pending Curations</h3> : null}
          </div>
          {notifications["pendingCurations"].map((pendingCuration, i) => (
            <NotificationCard type="pendingCurations" data={pendingCuration} key={i} />
          ))}
          <div class="col-lg-12 col-12 text-center">
            {notifications["curatedDocuments"].length ? <h3 class="mb-4">Curated Documents</h3> : null}
          </div>
          {notifications["curatedDocuments"].map((curatedDocument, i) => (
            <NotificationCard type="curatedDocuments" data={curatedDocument} key={i} />
          ))}
          <div class="col-lg-12 col-12 text-center">
            {notifications["declinedInvitations"].length ? <h3 class="mb-4">Decliend Invitaions</h3> : null}
          </div>
          {notifications["declinedInvitations"].map((decliendInvitation, i) => (
            <NotificationCard type="declinedInvitations" data={decliendInvitation} key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
