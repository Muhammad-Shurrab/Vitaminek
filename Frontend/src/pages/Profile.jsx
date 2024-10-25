import React, { useState } from "react";
import {
  User,
  ShoppingBag,
  Heart,
  Edit2,
  Check,
  Eye,
  Upload,
  Phone,
  Calendar,
} from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/api/placeholder/150/150",
    memberSince: "2023",
    phone: "+1 (555) 123-4567",
    membershipBadge: "Silver",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleNameEdit = () => {
    if (isEditing) {
      setUser({ ...user, name: editedName });
    }
    setIsEditing(!isEditing);
  };

  const [purchasedProducts, setPurchasedProducts] = useState([
    {
      id: 1,
      name: "100% Pure Whey",
      price: 95.0,
      image: "/api/placeholder/100/100",
      purchaseDate: "2024-07-15",
      arrivalDate: "2024-07-20",
    },
    {
      id: 2,
      name: "Creatine Monohydrate",
      price: 29.99,
      image: "/api/placeholder/100/100",
      purchaseDate: "2024-07-16",
      arrivalDate: "2024-07-21",
    },
    {
      id: 3,
      name: "BCAA Capsules",
      price: 34.99,
      image: "/api/placeholder/100/100",
      purchaseDate: "2024-07-17",
      arrivalDate: "2024-07-22",
    },
    {
      id: 4,
      name: "Pre-Workout Powder",
      price: 39.99,
      image: "/api/placeholder/100/100",
      purchaseDate: "2024-07-18",
      arrivalDate: "2024-07-23",
    },
  ]);

  const [favoritedArticles, setFavoritedArticles] = useState([
    {
      id: 1,
      title: "Top 10 Protein Powders",
      image: "/api/placeholder/100/100",
      category: "Nutrition",
    },
    {
      id: 2,
      title: "Benefits of BCAA",
      image: "/api/placeholder/100/100",
      category: "Supplements",
    },
    {
      id: 3,
      title: "Effective Workout Routines",
      image: "/api/placeholder/100/100",
      category: "Fitness",
    },
    {
      id: 4,
      title: "Meal Prep for Muscle Gain",
      image: "/api/placeholder/100/100",
      category: "Nutrition",
    },
  ]);

  const handleRemoveFavorite = (id) => {
    setFavoritedArticles(
      favoritedArticles.filter((article) => article.id !== id)
    );
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="title relative text-3xl font-bold text-center mb-8 before after mt-24">
          User Profile
        </h1>

        {/* User Info */}
        <div className="bg-white shadow overflow-hidden  sm:rounded-lg p-6 mb-6 ">
          <div className="flex items-center">
            <div className="relative">
              <img
                className="align- h-24 w-24 rounded-full object-cover"
                src={user.avatar}
                alt={user.name}
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer"
              >
                <Upload size={16} color="white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">
                      {user.name}
                    </h2>
                  )}
                  <button
                    onClick={handleNameEdit}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    {isEditing ? <Check size={20} /> : <Edit2 size={20} />}
                  </button>
                </div>
                <span className="bg-yellow-400 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {user.membershipBadge}
                </span>
              </div>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Phone size={16} className="mr-1" />
                <span>{user.phone}</span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1" />
                <span>Member since {user.memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Products */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-light-blue-500 mb-4">
            Purchased Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {purchasedProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 transition-all duration-300 hover:scale-110"
              >
                <img
                  src="https://b3186849.smushcdn.com/3186849/wp-content/uploads/2023/05/vanilla-6.png?lossy=1&strip=1&webp=1"
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">
                  Purchased: {product.purchaseDate}
                </p>
                <p className="text-xs text-gray-400">
                  Arrived: {product.arrivalDate}
                </p>
                <button className="mt-2 flex items-center justify-center w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-300">
                  <Eye size={16} className="mr-1" /> View Product
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Favorited Articles */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h3 className="text-lg font-bold text-light-blue-500 mb-4">
            Favorited Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favoritedArticles.map((article) => (
              <div
                key={article.id}
                className="border rounded-lg p-4 relative transition-all duration-300 hover:scale-110"
              >
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={article.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h4 className="font-semibold">{article.title}</h4>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                  {article.category}
                </span>
                <button className="mt-2 flex items-center justify-center w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-300">
                  <Eye size={16} className="mr-1" /> View Article
                </button>
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-300"
                  onClick={() => handleRemoveFavorite(article.id)}
                >
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
