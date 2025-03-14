import React, { useState } from "react";
import "./addUser.css"; // Import the CSS file
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage:'',
  });

  const navigate = useNavigate();
  function handleInput(e:  React.ChangeEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      console.log("Response:", response.data);
      navigate("/admin/home");
    } catch (error:any) {
    //   console.error("Error sending data:", error );
        
      toast.error(error.response?.data?.message,{
        position: "top-right",
        autoClose: 3000,  // Auto dismiss after 3 seconds
        hideProgressBar: false,  // Show progress bar
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",  // Use colored theme
        icon: () => <span style={{ fontSize: "20px" }}>🚨</span>,
            style: {
            borderRadius: "8px",
            background: "#ff4d4d",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px",
            fontSize: "14px",
         },
      })
    }
  };

  return (
    <div className="signup-container">
      <h3 className="signup-title">Add User</h3>
      <form className="signup-form" onSubmit={handleRegister}>

        
        <div className="input-group">
          <label className="input-label" htmlFor="name">
            Name:
          </label>
          <input
            className="input-field"
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInput(e, "name")}
          />
        </div>

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
          Register
        </button>

       
      </form>
    </div>
  );
}
