import React from "react"
import { getUserRole } from "./Auth"

const NotificationCard = (props) => {
  const userRole = getUserRole()
  return (
    <div className="col-lg-8 col-12 mt-3 mx-auto">
      <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-4">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="col-lg-6 col-sm-12">
              <p className="mb-0">
                <b>Curator Name:</b> {props.data.curatorName}
              </p>
            </div>
            <div className="col-lg-6 col-sm-12">
              <p className="mb-0">
                <b>Document Name:</b> {props.data.documentName}
              </p>
            </div>
          </div>
          <div>
            <p className="col-12 mb-0 mt-2">
              <b>Message:</b> {props.data.writerMessage}
            </p>
          </div>
          {userRole === "curator" && props.type === "pendingInvitations" ? (
            <div className="mt-3 d-flex justify-content-center">
              <button
                className="btn btn-primary bg-gradient me-2"
                onClick={() => {
                  props.acceptOrDeclineInvitations(true, props.data.id)
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-danger bg-gradient"
                onClick={() => {
                  props.acceptOrDeclineInvitations(false, props.data.id)
                }}
              >
                Decline
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
