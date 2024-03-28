import React from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { login } from "./Auth";
import APIManager from "../APIHandler/APIManager";
import { toast } from "react-toastify";
const Login = () => {
  let navigate = useNavigate()
  const handleSubmit = async (formData) => {
    try {
      let response = await APIManager.loginUser(formData);
      let data = await response.json();
      if (data["status"] === "OK") {
        let token = data["data"]["token"];
        login(token, formData);
        navigate('/dashboard');
      } else {
        toast.error(data["data"]["message"]);
      }
    } catch (error) {
      toast.error("Something went wrong !!");
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
