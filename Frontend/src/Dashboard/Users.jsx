import React, { useEffect, useState } from "react";

import Pagination from "../Dashboard/components/Pagination";
import axios from "axios";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/dash/");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/dash/${userId}/status`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-8">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                {user.isBanned ? "Inactive" : "Active"}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => toggleUserStatus(user._id)}
                  className={`px-4 py-2 text-white rounded ${
                    user.isBanned ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {user.isBanned ? "Activate" : "Deactivate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UsersManagement;
