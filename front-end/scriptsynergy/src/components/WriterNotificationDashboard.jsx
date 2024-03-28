import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import APIManager from "../APIHandler/APIManager"
import NotificationCard from "./NotificationCard"

export default function WriterNotificationDashboard() {
  const [writerNotification, setWriterNotification] = useState({
    pendingInvitations: [],
    pendingCurations: [],
    declinedInvitations: [],
    curatedDocuments: [],
  })
  const fetchWriterNotificationsAPICall = async () => {
    try {
      let response = await APIManager.fetchWriterNotifications()
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        setWriterNotification(response_json["data"])
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong!!")
    }
  }
  useEffect(() => {
    fetchWriterNotificationsAPICall()
  }, [])
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div class="col-lg-12 col-12 text-center">
            {writerNotification["pendingInvitations"].length ? <h3 class="mb-4">Pending Invitaions</h3> : null}
          </div>
          {writerNotification["pendingInvitations"].map((pendingInvitation, i) => (
            <NotificationCard data={pendingInvitation} type="pendingInvitations" key={i} />
          ))}
          <div class="col-lg-12 col-12 text-center">
            {writerNotification["pendingCurations"].length ? <h3 class="mb-4">Pending Curation</h3> : null}
          </div>
          {writerNotification["pendingCurations"].map((pendingCuration, i) => (
            <NotificationCard data={pendingCuration} type="pendingCurations" key={i} />
          ))}
          <div class="col-lg-12 col-12 text-center">
            {writerNotification["curatedDocuments"].length ? <h3 class="mb-4">Curated Documents</h3> : null}
          </div>
          {writerNotification["curatedDocuments"].map((curatedDocument, i) => (
            <NotificationCard data={curatedDocument} type="curatedDocuments" key={i} />
          ))}
          <div class="col-lg-12 col-12 text-center">
            {writerNotification["declinedInvitations"].length ? <h3 class="mb-4">Declined Invitation</h3> : null}
          </div>
          {writerNotification["declinedInvitations"].map((decliendInvitation, i) => (
            <NotificationCard data={decliendInvitation} key={i} type="declinedInvitations" />
          ))}
        </div>
      </div>
    </section>
  )
}
