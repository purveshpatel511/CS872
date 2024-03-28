import React from "react"
import { Link } from "react-router-dom"
import { getUserRole } from "./Auth.js"

export default function Header() {
  const userRole = getUserRole()
  return (
    <div id="sticky-wrapper is-sticky" className="sticky-wrapper">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="bi-back"></i>
            <span>Script Synergy</span>
          </Link>

          <div className="d-lg-none ms-auto me-4">
            <a href="#top" className="navbar-icon bi-person smoothscroll"></a>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {userRole === "writer" ? (
              <ul className="navbar-nav ms-lg-5 me-lg-auto">
                <li className="nav-item">
                  <Link to={"/dashboard"} className="nav-link click-scroll">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/dashboard/explore-curators" className="nav-link click-scroll">
                    Explore Curators
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/dashboard/open-editor" className="nav-link click-scroll">
                    Open Editor
                  </Link>
                </li>
              </ul>
            ) : null}
            <div className="d-none ms-auto d-lg-block">
              <Link
                to={userRole === "writer" ? "/writer/notification-dashboard" : "/curator/notification-dashboard"}
                className="navbar-icon bi bi-bell-fill smoothscroll"
              ></Link>
            </div>
            {userRole === "curator" ? (
              <div style={{ marginLeft: "2em" }} className="d-none d-lg-block">
                <Link to={"/curator/profile"} className="navbar-icon bi-person smoothscroll"></Link>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  )
}
