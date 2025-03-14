import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import './Header.css'; // Import the CSS file
import { logoutUser } from "../../api/userService";
import { logout } from "../../redux/userSlice";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userData = useSelector((state: RootState) => state.user);
  const name = userData.user.name;
  const navigate = useNavigate();
  const dispatch = useDispatch();

async function handleLogout() {
await  logoutUser();
dispatch(logout())
  navigate("/login");
}

  return (
    <header className="navbar">
      <span className="logo">User Dashboard</span>

      {/* Menu Button */}
      <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Profile Button */}
      <button
        className="profile-btn"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <User size={24} />
        <span>{name || "Profile"}</span>
      </button>

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="profile-dropdown">
          <span onClick={() => navigate("/")}>🏠 Home</span>
          <span onClick={() => navigate("/user/profile")}>👤 Your Profile</span>
          <span onClick={() =>handleLogout()}>🚪 Logout</span>
        </div>
      )}
    </header>
  );
}
