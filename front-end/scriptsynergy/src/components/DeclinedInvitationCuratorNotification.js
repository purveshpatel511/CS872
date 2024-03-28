import React from 'react'

export default function DeclinedInvitationCuratorNotification({decliendInvitation}) {
  return (
    <div>
        <p>Notification ID {decliendInvitation["id"]}</p>
        <p>Writer ID{decliendInvitation["writerId"]}</p>
        <p>Writer Email{decliendInvitation["writerEmail"]}</p>
        <p>Document Id{decliendInvitation["documentId"]}</p>
        <p>Document Name{decliendInvitation["documentName"]}</p>
        <p>Writer Message {decliendInvitation["writerMessage"]} This is a text field</p>
    </div>
  )
}
