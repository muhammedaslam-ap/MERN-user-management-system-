import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../../api/userService";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/userSlice";
import "./ProfileInfo.css";
import Header from "../header/header";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = 'user-management';
const CLOUDINARY_CLOUD_NAME = "djigsbuws";

export default function ProfileInfo() {
  const user = useSelector((state: RootState) => state.user.user);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userProfile, setUserProfile] = useState(user.profileImage);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(!!userProfile );
    useEffect(() => {
        setIsImage(!!userProfile );  
    }, [userProfile]);


   

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUserProfile();
      if (res) {
        setUserName(res.name);
        setUserEmail(res.email);
        setUserProfile(res.profileImage);
      }
    } catch (error) {
      setError("Failed to fetch profile data.");
      console.error("Error in fetching user profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload image.");
      throw error;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      setImage(imageUrl);
      setUserProfile(imageUrl); 
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);

    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const userData = {
        id: user._id, 
        name: userName,
        email: userEmail,
        profileImage: image || userProfile,
      };

      const res = await updateUserProfile(userData);
      if (res) {
        dispatch(update(res));
        setUserName(res?.name);
        setUserEmail(res?.email);
        setUserProfile(res?.profileImage);
        navigate('/');
      }
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || "Error updating profile. Please try again.";
      toast.error(errorMessage);
      
    }
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Profile Information</h2>

          {loading ? (
            <p>Loading profile...</p>
          ) : (
            <>
              {error && <p className="error-message">{error}</p>}
            {isImage? <img
                src={userProfile}
                alt="Uploaded"
                style={{ width: "200px", marginTop: "10px", borderRadius: "50%" }}
              />
                : <h4>No Profile</h4>
            }
             
              <label>Name</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                required
              />

              <label>Email</label>
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                type="text"
                required
              />
            <label>Add Profle</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {uploading && <p>Uploading...</p>}

              {image && (
                <div>
                  <p>Uploaded Image:</p>
                  <img
                    src={image}
                    alt="Uploaded"
                    style={{ width: "200px", marginTop: "10px" }}
                  />
                </div>
              )}

              <button className="profile-button" onClick={(e) => handleSubmit(e)}>
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}