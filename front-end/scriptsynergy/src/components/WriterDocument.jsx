import React from "react"
import APIManager from "../APIHandler/APIManager"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


export default function WriterDocument({ writerDocument }) {
  const navigate = useNavigate()
  const document_copy = writerDocument
  const isPDF = document_copy["fileType"] === "PDF"
  const openEditorButtonClickHandler = async (event) => {
    event.preventDefault()
    try {
      let response = await APIManager.fetchWriterDocumentPresignedURL(document_copy["id"])
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        let url = response_json["data"]["url"]
        let editor_content_resp = await fetch(url)
        let editor_content_resp_text = await editor_content_resp.text()
        navigate("/dashboard/open-editor", {
          state: {
            editorContentValue: editor_content_resp_text,
            fileNameValue: document_copy["fileName"],
          },
        })
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong!!")
    }
  }
  const downloadWriterFile = async (event) => {
    event.preventDefault();
    try {
      let response = await APIManager.fetchWriterDocumentPresignedURL(
        document_copy["id"]
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
            document_copy["fileName"],
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
      console.log(error)
      toast.error("Something went wrong!!");
    }
  };
  return (
    // <div>
    //   <p>{document_copy.fileName}</p>
    //   <button onClick={openEditorButtonClickHandler}>Open in Editor</button>
    // </div>

    <section className="explore-section section-padding" id="section_2">
      <div className="container-fluid">
        <div className="col-lg-4 col-md-4 col-12">
          <div className="custom-block custom-block-overlay">
            <div className="d-flex flex-column">
              <div className="custom-block-overlay-text d-flex">
                <div>
                  <h5 className="text-white mb-2">{document_copy.fileName}</h5>
                  {
                    isPDF ?    <button onClick={downloadWriterFile} className="btn custom-btn mt-2">
                    Download File
                  </button>:        <button onClick={openEditorButtonClickHandler} className="btn custom-btn mt-2">
                    Edit
                  </button>
                  }
                </div>

              </div>
              <div className="section-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
