import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import APIManager from "../APIHandler/APIManager"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const OpenEditor = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  let editorContentValue = ""
  let fileNameValue = ""
  let isEditableMode = true
  if (state != null) {
    editorContentValue = state["editorContentValue"]
    fileNameValue = state["fileNameValue"]
    isEditableMode = false
  }

  const [editorContent, setEditorContent] = useState(editorContentValue)
  const [fileName, setFileName] = useState(fileNameValue)

  const handleSave = () => {
    if (!fileName.trim()) {
      toast.error("Please enter a file name.")
      return
    }
    saveEditorData()
  }

  const saveEditorData = async () => {
    const requestBody = {
      editor_content: editorContent,
      file_name: fileName, // Add file name to the request body
    }
    try {
      let response = await APIManager.saveEditorContent(requestBody)
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        toast.success(response_json["data"]["message"])
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong we are looking into")
    }
  }
  const useAIHelpAPICall = async () => {
    try {
      let response = await APIManager.generateAIText(editorContent)
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        let ai_content = response_json["data"]
        setEditorContent((prev) => prev + " " + ai_content)
        toast.success(response_json["data"]["message"])
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong we are looking into")
    }
  }

  return (
    <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 mx-auto">
            <h2 className="text-white text-center">Create Document</h2>
          </div>
          <div className="container mt-2">
            <div className="row">
              <form onSubmit={handleSave} className="contact-form" role="search">
                <div className="col-lg-6 col-12 mx-auto">
                  <div className="mb-5">
                    <ReactQuill
                      value={editorContent}
                      onChange={(value) => setEditorContent(value)}
                      placeholder="Enter your text here..."
                      theme="snow"
                      height="15em"
                      style={{ height: "20em" , background: "white", overflow : "auto" }}

                    />
                  </div>
                  {isEditableMode ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="Enter file name"
                      />
                      <button
                        type="button"
                        className="mt-3 form-control btn btn-primary bg-gradient"
                        onClick={useAIHelpAPICall}
                      >
                        Use AI Help
                      </button>
                    </>
                  ) : (
                    <h4 className="text-white text-center">{fileName}</h4>
                  )}
                  <button type="button" className="mt-3 form-control btn btn-primary bg-gradient" onClick={handleSave}>
                    Save
                  </button>
                  {isEditableMode ? (
                    <button
                      type="button"
                      className="mt-3 form-control btn btn-primary bg-gradient"
                      onClick={() => {
                        navigate("/editor/upload-pdf")
                      }}
                    >
                      Upload PDF
                    </button>
                  ) : (
                    <></>
                  )}
                </div>{" "}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OpenEditor
