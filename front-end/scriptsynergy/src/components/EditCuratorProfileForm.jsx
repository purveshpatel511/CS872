import React, { useState } from "react"

export default function EditCuratorProfileForm({
  onSubmit,
  curatorName,
  curatorEmail,
  curatorProfessionalBio,
  curatorHourlyRate,
  curatorExpertise,
  curatorPaymentId,
}) {
  const [username, setUsername] = useState(curatorName)
  const [email, setEmail] = useState(curatorEmail)
  const [professionalBio, setProfessionalBio] = useState(curatorProfessionalBio)
  const [hourlyRate, setHourlyRate] = useState(curatorHourlyRate)
  const [expertise, setExpertise] = useState(curatorExpertise)
  const [paymentId, setPaymentId] = useState(curatorPaymentId)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      username,
      email,
      professionalBio,
      hourlyRate,
      expertise,
      paymentId,
    })
  }
  return (
    <div className="container section-padding mb-5">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="pd-0">Update Profile</h2>
        </div>
        <div className="col-lg-8 col-12 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="custom-form d-flex flex-column align-items-center contact-form mt-4 pt-2 mb-lg-0 mb-5"
          >
            <div className="col-lg-6 col-md-6 col-12">
              <div className="form-floating">
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
                <label htmlFor="floatingInput">User Name</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="form-floating">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="form-floating">
                <textarea
                  id="professional-bio"
                  placeholder="Professional Bio"
                  value={professionalBio}
                  onChange={(e) => setProfessionalBio(e.target.value)}
                  className="form-control"
                />
                <label htmlFor="professional-bio">Professional Bio</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="form-floating">
                <input
                  id="hourly-rate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="form-control"
                />
                <label htmlFor="hourly-rate">Hourly Rate</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="form-floating">
                <input
                  id="payment-id"
                  type="text"
                  value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                  className="form-control"
                />
                <label htmlFor="payment-id">Paypal Payment ID</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="form-floating">
                <textarea
                  id="expertise"
                  placeholder="AI, Machine Learning"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className="form-control"
                />
                <label htmlFor="expertise">Expertise</label>
              </div>{" "}
              <button type="submit" className="form-control mt-4">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
