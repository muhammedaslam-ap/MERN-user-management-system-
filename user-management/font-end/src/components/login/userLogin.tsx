import "./userLogin.css";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAxiosInstance } from "../../api/userAxiosInstance";
import { login } from "../../redux/userSlice";
import { AxiosError } from "axios";

type FormData = {
  email: string;
  password: string;
};

type Errors = {
  email: string;
  password: string;
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateField(field, value);
  }

  function validateField(field: keyof FormData, value: string) {
    let errorMessage = "";

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    validateField("email", formData.email);
    validateField("password", formData.password);

    if (errors.email || errors.password) {
      return;
    }

    try {
      const response = await userAxiosInstance.post("/login", formData);
      console.log("Response:", response.data);
      dispatch(login(response.data.user));
      navigate("/");
    } catch (error) {
      if ((error as AxiosError).response) {
        setErrors((prev) => ({ ...prev, email: "Invalid credentials" }));
      } else {
        console.error("Network error or unexpected error:", (error as AxiosError).message);
      }
    }
  };

  const formValid = formData.email && formData.password && !errors.email && !errors.password;

  return (
    <div className="signup-container">
      <h3 className="signup-title">Login</h3>
      <form className="signup-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label className="input-label" htmlFor="email">Email:</label>
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
          <label className="input-label" htmlFor="password">Password:</label>
          <input
            className="input-field"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInput(e, "password")}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button className="signup-button" type="submit" disabled={!formValid}>Login</button>

        <Link to="/signup">Click for SignUp</Link>
      </form>
    </div>
  );
}
