import "./login.css";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminAxiosInstance } from "../../../api/adminAxiosInstance";
import { login } from "../../../redux/adminSlice";
import {toast} from 'react-toastify'

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await adminAxiosInstance.post("/admin/login", formData);

      console.log("Response:", response.data);

      dispatch(login(response.data.admin));

      navigate("/admin/home");
    } catch (error:any) {
      // console.log("Error on sending the details:", error);
      toast.error(error.response?.data?.message)
    }
  };

  return (
    <div className="signup-container">
      <h3 className="signup-title">Admin Login</h3>
      <form className="signup-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email:
          </label>
          <input
            className="input-field"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInput(e, "email")}
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Password:
          </label>
          <input
            className="input-field"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInput(e, "password")}
          />
        </div>

        <button className="signup-button" type="submit">
          Login
        </button>

        <Link to="/signup">click for SignUp</Link>
      </form>
    </div>
  );
}
