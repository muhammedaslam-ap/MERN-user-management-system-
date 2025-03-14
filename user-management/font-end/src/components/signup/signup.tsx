import React, { useState } from "react";
import "./signup.css"; // Import the CSS file
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

   const [errors, setErrors] = useState({
     name: "",
     email: "",
     password: "",
   });

const navigate = useNavigate();
  function handleInput(e:React.ChangeEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateField(field, value);
  }

  function validateField(field:string, value:string) {
    let errorMessage = "";

    if (field === "name") {
      if (!value.trim()) {
        errorMessage = "Name is required.";
      } else if (value.length < 3) {
        errorMessage = "Name must be at least 3 characters."; 
      }
    }

    if (field === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value.trim()) {
        errorMessage = "Email is required.";
      } else if (!emailPattern.test(value)) {
        errorMessage = "Enter a valid email.";
      }
    }

    if (field === "password") {
      if (!value.trim()) {
        errorMessage = "Password is required.";
      } else if (value.length < 6) {
        errorMessage = "Password must be at least 6 characters.";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

     validateField("name", formData.name);
     validateField("email", formData.email);
     validateField("password", formData.password);

     if (errors.name || errors.email || errors.password) {
       return;
     }
     console.log(formData)
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      console.log("Response:", response.data);
      navigate('/login')
      
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="signup-container">
      <h3 className="signup-title">Register</h3>
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
          {errors.name && <p className="error-message">{errors.name}</p>}
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
          {errors.email && <p className="error-message">{errors.email}</p>}
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
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <button
          className="signup-button"
          type="submit"
          disabled={!!errors.name || !!errors.email || !!errors.password}
        >
          Register
        </button>

        <Link to="/login">click to Login</Link>
      </form>
    </div>
  );
}
