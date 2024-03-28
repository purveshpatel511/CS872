import React, { useEffect, useState } from "react"
import APIManager from "../APIHandler/APIManager"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function ViewCuratorProfile() {
  const navigate = useNavigate()
  const [curatorProfile, setCuratorProfile] = useState({
    id: null,
    name: null,
    email: null,
    professionalBio: null,
    hourlyRate: null,
    expertise: null,
    paymentId: null,
  })
  const fetchCuratorProfileAPICall = async () => {
    try {
      let response = await APIManager.fetchCuratorProfile()
      let response_json = await response.json()
      if (response_json["status"] === "OK") {
        setCuratorProfile(() => {
          return {
            id: response_json["data"]["id"],
            name: response_json["data"]["name"],
            email: response_json["data"]["email"],
            professionalBio: response_json["data"]["professionalBio"],
            hourlyRate: response_json["data"]["hourlyRate"],
            expertise: response_json["data"]["expertise"],
            paymentId: response_json["data"]["paymentId"],
          }
        })
      } else {
        toast.error(response_json["data"]["message"])
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!!")
    }
  }
  useEffect(() => {
    fetchCuratorProfileAPICall()
  }, [])
  return (
    <div className="container section-padding mt-5">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-12 mx-auto">
          <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-4 dont-hover">
            <div className="col-12 text-center">
              <h3 className="mb-4">Curator Profile</h3>
            </div>
            <p className="mb-0">
              <b>Name: </b> {curatorProfile.name}
            </p>
            <p className="mb-0">
              <b>Professional Bio: </b>
              {curatorProfile.professionalBio}
            </p>
            <p className="mb-0">
              <b>Email: </b>
              {curatorProfile.email}
            </p>
            <p className="mb-0">
              <b>Hourly Rate: </b> {curatorProfile.hourlyRate}
            </p>
            <p className="mb-0">
              <b>Expertise: </b> {curatorProfile.expertise}
            </p>
            <p className="mb-0">
              <b>Paypal Payment ID: </b> {curatorProfile.paymentId}
            </p>
            <button
              className="form-control btn bg-info bg-gradient mt-4"
              onClick={(e) => {
                e.preventDefault()
                navigate("/curator/edit-profile", { state: curatorProfile })
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
