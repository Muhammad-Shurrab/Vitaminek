import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  ShoppingBag,
  Heart,
  Edit2,
  Save,
  X,
  Camera,
  ChevronRight,
  Calendar,
  DollarSign,
  Package,
  Eye,
} from "lucide-react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/profile");
      setProfile(response.data.user);
      setOrders(response.data.orders);
      setEditForm({
        name: response.data.user.name,
        email: response.data.user.email,
        password: "",
        newPassword: "",
        photo: response.data.user.photo,
      });
      console.log("Uesr", profile);
      setLoading(false);
    } catch (err) {
      setError("Failed to load profile data");
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setEditForm({ ...editForm, photo: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("email", editForm.email);
      if (editForm.newPassword) {
        formData.append("password", editForm.newPassword);
      }
      if (editForm.photo instanceof File) {
        formData.append("photo", editForm.photo);
      }

      const response = await axios.patch(
        "http://localhost:5000/api/profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProfile(response.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={profile.photo || "/placeholder-avatar.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-50"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera size={16} className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-gray-500 flex items-center">
              <Mail size={16} className="mr-2" /> {profile.email}
            </p>
          </div>
        </div>

        <div className="flex space-x-1">
          {["profile", "orders", "favorites"].map((tab) => (
            <button
              key={tab}
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "profile" && <User size={18} />}
              {tab === "orders" && <ShoppingBag size={18} />}
              {tab === "favorites" && <Heart size={18} />}
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
          <div className="flex items-center">
            <X className="text-red-500 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Profile Content */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-xl shadow-sm p-8">
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <User size={16} className="mr-2" /> Name
                </label>
                <p className="mt-1 text-lg">{profile.name}</p>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <Mail size={16} className="mr-2" /> Email
                </label>
                <p className="mt-1 text-lg">{profile.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit2 size={18} />
                <span>Edit Profile</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <User size={16} className="mr-2" /> Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <Mail size={16} className="mr-2" /> Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <Lock size={16} className="mr-2" /> Current Password
                </label>
                <input
                  type="password"
                  value={editForm.password}
                  onChange={(e) =>
                    setEditForm({ ...editForm, password: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-600">
                  <Lock size={16} className="mr-2" /> New Password
                </label>
                <input
                  type="password"
                  value={editForm.newPassword}
                  onChange={(e) =>
                    setEditForm({ ...editForm, newPassword: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setPhotoPreview(null);
                  }}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X size={18} />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium flex items-center">
                  <Package className="mr-2 text-blue-600" />
                  Order #{order._id}
                </h3>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.orderStatus === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-400" size={18} />
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-gray-400" size={18} />
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium">${order.totalAmount}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <Package className="mr-2" size={16} />
                  Products
                </p>
                <div className="space-y-2">
                  {order.products.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                      <span className="font-medium">{item.product.title}</span>
                      <span className="text-gray-600">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Favorites Tab */}
      {activeTab === "favorites" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.favorites.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={article.coverImage || "/placeholder-article.jpg"}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-medium text-lg mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex items-center">
                  <Package size={16} className="mr-2" />
                  {article.category}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Eye size={16} className="mr-1" />
                    {article.views} views
                  </span>
                  <button
                    onClick={() => {
                      /* Handle unfavorite */
                    }}
                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Heart size={16} fill="currentColor" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
