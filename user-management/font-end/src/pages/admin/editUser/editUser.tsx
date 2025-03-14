import  { useEffect, useState } from "react";
import "./editUser.css"; // Import the CSS file
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUserProfile } from "../../../api/adminService";
import {toast} from 'react-toastify'
export default function EditUser() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const navigate = useNavigate();
  function handleSubmit(id:string) {
  
    const userData = {
      name:name,
      email:email
    }
    updateUserProfile(id ,userData)
  
      navigate("/admin/home");
  }
  const { id } = useParams()||'';
  console.log(id)
  const fetchData = async () => {
    try {
      if(id){
      const res = await getUserById(id);
      console.log("Fetched User Data:", res?.data.updatedUser);
      setName(res?.data.updatedUser.name);
      setEmail(res?.data.updatedUser.email);

      }
     
    } catch (error:any) {

    toast.error(error.response?.data?.message,{
            position: "top-right",
            autoClose: 3000,  // Auto dismiss after 3 seconds
            hideProgressBar: false,  // Show progress bar
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",  
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

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="signup-container">
      <h3 className="signup-title">Edit User</h3>
      <form className="signup-form" onSubmit={()=>handleSubmit(id||'')}>
        <div className="input-group">
          <label className="input-label" htmlFor="name">
            Name:
          </label>
          <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
            className="input-field"
            id="name"
            type="text"
            
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email:
          </label>
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            className="input-field"
            id="email"
            type="email"
            
          />
        </div>

        <button className="signup-button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
