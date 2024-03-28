import React from "react"
import { useNavigate } from "react-router-dom"
import "./LandingPage.css"

const LandingPage = () => {
  // return (
  //   <div>
  //     <h1>Welcome to Our Website</h1>
  //     <p>Please sign in or sign up to continue.</p>
  //     <div>
  //       <Link to="/signin">Sign In</Link>
  //       <Link to="/signup">Sign Up</Link>
  //     </div>
  //   </div>
  // );

  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate("/signin")
  }

  const handleSignUp = () => {
    navigate("/signup")
  }

  return (
    <React.Fragment>
      <section className="hero-section" id="section_1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 ms-auto d-flex flex-column">
              <div className="md-5 mt-5">
                <h2 className="text-white text-center">Welcome to</h2>
                <br />
                <h1 className="text-white text-center">
                  <i className="bi-back m-3"></i>
                  Script Synergy
                </h1>
              </div>

              <div className="button-container mt-5" style={{marginLeft:"45%"}}>
                <button type="submit" className="form-control" onClick={handleSignIn}>
                  Sign In
                </button>
                <button type="submit" className="form-control" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default LandingPage
