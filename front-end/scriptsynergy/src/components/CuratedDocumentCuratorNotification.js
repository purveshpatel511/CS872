import React from 'react'

export default function CuratedDocumentCuratorNotification({curatedDocument}) {
  return (
    <div>
        <p>Notification ID {curatedDocument["id"]}</p>
        <p>Writer ID{curatedDocument["writerId"]}</p>
        <p>Writer Email{curatedDocument["writerEmail"]}</p>
        <p>Document Id{curatedDocument["documentId"]}</p>
        <p>Document Name{curatedDocument["documentName"]}</p>
        <p>Curator Message{curatedDocument["curatorMessage"]} This is a text field</p>
        <p>Writer Message {curatedDocument["writerMessage"]} This is a text field</p>
    </div>
  )
}
