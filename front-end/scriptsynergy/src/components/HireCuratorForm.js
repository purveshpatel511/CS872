import React, { useEffect, useState } from "react"
import APIManager from "../APIHandler/APIManager"
import { toast } from "react-toastify"

const HireCuratorForm = ({ onSubmit }) => {
  const [documents, setDocuments] = useState([])
  const [documentId, setDocumentId] = useState()
  const [message, setMessage] = useState("")

  const fetchAllDocumentsAPICall = async () => {
    try {
      let response = await APIManager.fetchAllWriterDocuments()
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        setDocuments(response_json["data"])
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      toast.error("Something went wrong!!")
    }
  }
  useEffect(() => {
    fetchAllDocumentsAPICall()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ documentId, message })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-12 mx-auto">
          <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-4 dont-hover">
            <div className="col-12 text-center">
              <h3 className="mb-4">Hire Curator</h3>
            </div>
            <form onSubmit={handleSubmit} className="contact-form d-flex flex-column align-items-center">
              <select value={documentId} onChange={(e) => setDocumentId(e.target.value)} className="form-control">
                <option>Select Document</option>
                {documents.map((document, i) => {
                  return (
                    <option value={document["id"]} key={i}>
                      {document["fileName"]}
                    </option>
                  )
                })}
              </select>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                cols={50}
                placeholder="Enter your text here..."
                className="form-control mt-4"
              />
              <button type="submit" className="btn btn-primary bg-gradient form-control mt-4">
                HireMe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HireCuratorForm
