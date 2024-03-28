import React from 'react'

export default function PendingInvitaionCuratorNotification({pendingInvitaion, acceptOrDeclineInvitations}) {
  return (
    <div>
      <p>Notification ID {pendingInvitaion["id"]}</p>
      <p>Writer ID{pendingInvitaion["writerId"]}</p>
      <p>Writer Email{pendingInvitaion["writerEmail"]}</p>
      <p>Document Id{pendingInvitaion["documentId"]}</p>
      <p>Document Name{pendingInvitaion["documentName"]}</p>
      <p>Message {pendingInvitaion["writerMessage"]}</p>
      <button onClick={(e)=>{e.preventDefault(); acceptOrDeclineInvitations(true,pendingInvitaion["id"])}}>Accept Invitaions</button>
      <button onClick={(e)=>{e.preventDefault(); acceptOrDeclineInvitations(false,pendingInvitaion["id"])}}>Decline Invitaions</button>
    </div>
  )
}
