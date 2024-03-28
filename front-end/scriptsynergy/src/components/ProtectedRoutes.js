import React, { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { isAuthenticated } from "./Auth" // Assuming you have an auth module with an isAuthenticated function
import { toast } from "react-toastify"
import Header from "./Header"
import { HashLoader } from "react-spinners"

const ProtectedRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const validateTokenAPICall = async () => {
    try {
      let response = await isAuthenticated()
      if (response.ok) {
        setAuthenticated(() => true)
      } else {
        toast.error("Invalid Credentials Please Sign In")
        setAuthenticated(() => false)
      }
    } catch (err) {
      toast.error("Something Went Wrong!!")
      setAuthenticated(() => false)
    } finally {
      setLoading(() => false)
    }
  }
  useEffect(() => {
    validateTokenAPICall()
  }, [])
  return (
    <>
      {loading ? (
        <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
          <HashLoader color="#36d7b7" />
        </div>
      ) : authenticated ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  )
}

export default ProtectedRoutes
