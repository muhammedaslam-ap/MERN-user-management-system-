import React from "react";
import UserList from "../../../components/userlist/userlist";
import "./home.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../../api/adminService";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../redux/adminSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleAddUser(){
    navigate('/admin/addUser')
  }
  function handleLogout(){
    logoutAdmin();
    dispatch(adminLogout())
    navigate('/admin/login')
  }
  return (
    <div className="home-container">
      <h3 className="home-title">Admin Dashboard</h3>
      <div className="home-actions">
        <button onClick={handleAddUser}>Add User</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
     
      <UserList />
    </div>
  );
}
