import React, { useState } from "react"
import { toast } from "react-toastify"
import APIManager from "../APIHandler/APIManager"

export default function UploadPDFFileForm() {
  const [file, setFile] = useState([])

  function handleChange(e) {
    e.preventDefault()
    const files = e.target.files
    const fileCount = files.length
    if (fileCount > 1) {
      toast.error("Please upload only one file")
      e.target.value = ""
      return false
    }
    if (file.size > 8e6) {
      toast.error("Please upload a file smaller than 8 MB")
      e.target.value = ""
      return false
    }
    setFile(() => e.target.files[0])
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = new FormData()
      data.append("file", file)
      data.append("name", file.name)
      let response = await APIManager.uploadEditorPDFFile(data)
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

  return (
    <div className="container section-padding">
      <div className="row">
        <div class="col-lg-12 col-12 text-center">
          <h2 class="m-4">Choose And Upload File</h2>
        </div>
        <div className="col-lg-8 col-12 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="custom-form d-flex flex-column align-items-center contact-form mt-4 pt-2 mb-lg-0 mb-5"
            role="search"
          >
            <div className="col-lg-6 col-md-6 col-12">
              <input type="file" onChange={handleChange} className="form-control" />
            </div>

            <button type="submit" className="form-control mt-4">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
