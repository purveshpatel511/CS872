import React, { useState } from "react";
import APIManager from "../APIHandler/APIManager";
import { toast } from "react-toastify";

export default function CuratorFeedbackForm({documentId, documentName, handleSubmit}) {
  const [feedback, setFeedback] = useState('');
  const downloadWriterFile = async (event) => {
    event.preventDefault();
    try {
      let response = await APIManager.fetchWriterDocumentPresignedURL(
        documentId
      );
      let response_json = await response.json();
      if (response_json["status"] === "OK") {
        let presignedUrl = response_json["data"]["url"];
        let editor_content_resp = await fetch(presignedUrl);
        let blob = await editor_content_resp.blob()
        const url = window.URL.createObjectURL(
            new Blob([blob]),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            documentName,
          );
      
          // Append to html link element page
          document.body.appendChild(link);
      
          // Start download
          link.click();
      
          // Clean up and remove the link
          link.parentNode.removeChild(link);
          toast.success("File Downloading Started")
      } else {
        toast.error(response_json["data"]["message"]);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };
  return (
    <div>
      <h2>Curator Feedback Form</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Enter your text here..."
      />
      <br />
      <button onClick={downloadWriterFile}> Download Writer File ({documentName}) </button>
      <br />
      <button onClick={(e)=> {e.preventDefault(); handleSubmit({feedback})}}>Provide Feedback</button>
      <br />
    </div>
  );
}
