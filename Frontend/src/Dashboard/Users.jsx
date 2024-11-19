import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, UserCheck, UserX, Loader2 } from "lucide-react";
import Pagination from "../Dashboard/components/Pagination";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/dash/");
      setUsers(data);
      setError(null);
    } catch (error) {
      setError("Failed to load users. Please try again later.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    const action = currentStatus ? "deactivate" : "activate";

    try {
      const result = await Swal.fire({
        title: `Are you sure?`,
        text: `Do you want to ${action} this user?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: currentStatus ? "#dc2626" : "#2563eb",
        cancelButtonColor: "#6b7280",
        confirmButtonText: currentStatus
          ? "Yes, deactivate!"
          : "Yes, activate!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.put(`http://localhost:5000/api/dash/${userId}/status`);
        await fetchUsers();

        Swal.fire({
          title: "Success!",
          text: `User has been ${action}d successfully!`,
          icon: "success",
          confirmButtonColor: "#2563eb",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      Swal.fire({
        title: "Error!",
        text: `Failed to ${action} user. Please try again.`,
        icon: "error",
        confirmButtonColor: "#dc2626",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            User Management
          </h1>
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                        transition-all duration-200 outline-none"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 text-center">
              {error}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium text-gray-900">
                            {user.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm
                            ${
                              user.isBanned
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {user.isBanned ? (
                              <UserX className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4" />
                            )}
                            {user.isBanned ? "Inactive" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() =>
                              toggleUserStatus(user._id, !user.isBanned)
                            }
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg
                              text-white font-medium transition-all duration-200
                              ${
                                user.isBanned
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-red-600 hover:bg-red-700"
                              } shadow-sm hover:shadow-md`}
                          >
                            {user.isBanned ? (
                              <>
                                <UserCheck className="w-4 h-4" />
                                Activate
                              </>
                            ) : (
                              <>
                                <UserX className="w-4 h-4" />
                                Deactivate
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center py-6">
                <Pagination
                  totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
