import React, { useState } from "react"
import "./SignUpForm.css"

const SignUpForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [role, setRole] = useState("writer") // Default role is 'writer'

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ email, password, role })
  }

  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         placeholder="Username"
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //       />
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <div>
  //         <input
  //           type="radio"
  //           id="writer"
  //           value="writer"
  //           checked={role === 'writer'}
  //           onChange={() => setRole('writer')}
  //         />
  //         <label htmlFor="writer">Writer</label>
  //       </div>
  //       <div>
  //         <input
  //           type="radio"
  //           id="curator"
  //           value="curator"
  //           checked={role === 'curator'}
  //           onChange={() => setRole('curator')}
  //         />
  //         <label htmlFor="curator">Curator</label>
  //       </div>
  //       <button type="submit">Sign Up</button>
  //     </form>
  //   );
  // };
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         placeholder="Username"
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //       />
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <div>
  //         <input
  //           type="radio"
  //           id="writer"
  //           value="writer"
  //           checked={role === 'writer'}
  //           onChange={() => setRole('writer')}
  //         />
  //         <label htmlFor="writer">Writer</label>
  //       </div>
  //       <div>
  //         <input
  //           type="radio"
  //           id="curator"
  //           value="curator"
  //           checked={role === 'curator'}
  //           onChange={() => setRole('curator')}
  //         />
  //         <label htmlFor="curator">Curator</label>
  //       </div>
  //       <button type="submit">Sign Up</button>
  //     </form>
  //   );
  // };
  return (
    <React.Fragment>
      <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <h1 className="text-white text-center">Create an Account</h1>
              <h6 className="text-center">Let's connect to our community'</h6>
              <form
                onSubmit={handleSubmit}
                className="custom-form d-flex flex-column align-items-center contact-form mt-4 pt-2 mb-lg-0 mb-5"
                role="search"
              >
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      placeholder="User Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                    <label for="floatingInput">User Email</label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-floating">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                    />
                    <label for="floatingInput">Password</label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      placeholder="Confirm Password"
                      value={confirmpassword}
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      className="form-control"
                    />
                    <label for="floatingInput">Confirm Password</label>
                  </div>
                </div>

                <div class="radio-container">
                  <div>
                    <input
                      type="radio"
                      id="radio1"
                      value={"writer"}
                      checked={role === "writer"}
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

                <button type="submit" className="form-control mt-5">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default SignUpForm
