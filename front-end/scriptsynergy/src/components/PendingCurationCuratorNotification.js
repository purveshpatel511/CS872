import React from "react";
import { useNavigate } from "react-router-dom";

export default function PendingCurationCuratorNotification({
  pendingCuration,
}) {
  const navigate = useNavigate();
  const feebackNavigationClick = (e) => {
    e.preventDefault();
    navigate("/curator/feedback", {
      state: {
        documentId: pendingCuration["documentId"],
        documentName: pendingCuration["documentName"],
        notificationId: pendingCuration["id"],
      },
    });
  };
  return (
    <div>
      <p>Notification ID {pendingCuration["id"]}</p>
      <p>Writer ID{pendingCuration["writerId"]}</p>
      <p>Writer Email{pendingCuration["writerEmail"]}</p>
      <p>Document Id{pendingCuration["documentId"]}</p>
      <p>Document Name{pendingCuration["documentName"]}</p>
      <p>
        Writer Message {pendingCuration["writerMessage"]} This is a text field
      </p>
      <button onClick={feebackNavigationClick}>Give Feedback</button>
    </div>
  );
}
