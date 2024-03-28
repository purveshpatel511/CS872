import React from 'react'

export default function PendingInvitationWriterNotification({pendingInvitaion}) {
  return (
    <div>
      <p>Notification ID {pendingInvitaion["id"]}</p>
      <p>Curator ID{pendingInvitaion["curatorId"]}</p>
      <p>Curator Name{pendingInvitaion["curatorName"]}</p>
      <p>Document Id{pendingInvitaion["documentId"]}</p>
      <p>Document Name{pendingInvitaion["documentName"]}</p>
      <p>Message {pendingInvitaion["writerMessage"]}</p>
    </div>
  )
}
