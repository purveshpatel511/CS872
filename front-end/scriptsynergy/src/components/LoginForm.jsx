import React, { useState } from "react"
import "./SignUpForm.css"

const LoginForm = ({ onSubmit }) => {
  const [userId, setUserId] = useState("")
  const [userPass, setUserPass] = useState("")
  const [role, setRole] = useState("writer") // Default role is 'writer'

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ userId, userPass, role })
  }

  return (
    <React.Fragment>
      <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <h1 className="text-white text-center">Discover. Learn. Enjoy</h1>
              <h6 className="text-center">platform for creatives around the world</h6>
              <form
                onSubmit={handleSubmit}
                className="custom-form d-flex flex-column align-items-center contact-form mt-4 pt-2 mb-lg-0 mb-5"
                role="search"
              >
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      placeholder="User ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="form-control"
                    />
                    <label for="floatingInput">User ID</label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-floating">
                    <input
                      type="password"
                      placeholder="Password"
                      value={userPass}
                      onChange={(e) => setUserPass(e.target.value)}
                      className="form-control"
                    />
                    <label for="floatingInput">Password</label>
                  </div>
                </div>

                <div class="radio-container">
                  <div>
                    <input
                      type="radio"
                      id="radio1"
                      checked={role === "writer"}
                      value={"writer"}
                      onChange={() => setRole("writer")}
                      class="radio-input"
                      name="radios"
                    />
                    <label for="radio1" class="radio-label">
                      <div class="radio-content">
                        <div class="image-container"></div>
                        <div class="name-container">
                          <p class="name">Writer</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="radio2"
                      value={"curator"}
                      onChange={() => setRole("curator")}
                      class="radio-input"
                      name="radios"
                    />
                    <label for="radio2" class="radio-label">
                      <div class="radio-content">
                        <div class="image-container"></div>
                        <div class="name-container">
                          <p class="name">Curator</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <button type="submit" className="form-control mt-4">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default LoginForm
