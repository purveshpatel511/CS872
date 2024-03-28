// auth.js

import APIManager from "../APIHandler/APIManager"

// Function to check if user is authenticated
export const isAuthenticated = async () => {
  // Check if user token exists in localStorage
  // let token = localStorage.getItem('token')
    let token = localStorage.getItem('token')
    return APIManager.validateToken(token);
}

// Function to login user
export const login = (token, userData) => {
  // Store user token in localStorage
  localStorage.setItem("token", token)
  localStorage.setItem("userData", JSON.stringify(userData))
}

// Function to logout user
export const logout = () => {
  // Remove user token from localStorage
  localStorage.removeItem("token")
  localStorage.removeItem("userData")
}

export const getToken = () => {
  // Store user token in localStorage
  return localStorage.getItem("token")
}

export const getUserData = () => {
  let userData = localStorage.getItem("userData")
  if (userData) {
    userData = JSON.parse(userData)
    return userData
  }
  return null
}

export const getUserRole = () => {
  const userData = getUserData()
  if (userData) {
    return userData.role
  }
  return ""
}
