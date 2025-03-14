import React, { useEffect, useState } from "react";
import { deleteUser, getUserProfile } from "../../api/adminService";
import "./userList.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  profileImage: string;
  name: string;
  email: string;
}

export default function UserList() {
  const [userList, setUserList] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [searchedUserList, setSearchedUserList] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getUserProfile();
      console.log("Fetched User Data:", res);
      if (res) {
        setUserList(res.data.usersList);
        console.log("Updated User List:", res.data.usersList);
      }
    } catch (error) {
      console.log("Error in fetching user List", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  useEffect(() => {
    if (search === "") {
      setSearchedUserList(userList);
    } else {
      const newList = userList.filter((curr) =>
        curr.name.toLowerCase().startsWith(search.toLowerCase())
      );
      setSearchedUserList(newList);
    }
  }, [search,userList]); 

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleDelete(userId: string) {
    fetchData();
    deleteUser(userId);
  }

  function handleEdit(userId: string) {
    navigate(`/admin/editUser/${userId}`);
  }

  return (
    <div className="user-list-container">
      <input
        onChange={(e) => handleInput(e)}
        type="text"
        className="home-search"
        placeholder="Search users"
      />
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Profile Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchedUserList.length > 0 ? (
            searchedUserList.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="profile-icon">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Uploaded"
                        style={{ width: "50px", borderRadius: "50%" }}
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="view-button-edit"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="view-button-delete"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="no-users">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
