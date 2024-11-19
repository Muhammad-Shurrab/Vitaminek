import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, Loader2 } from "lucide-react";
import ProductList from "./components/customcomponent/ProductList";
import ProductForm from "./components/customcomponent/ProductForm";
import Pagination from "../Dashboard/components/Pagination";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/dash/products/"
      );
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async (productData) => {
    try {
      await axios.post("http://localhost:5000/api/dash/products/", productData);
      await loadProducts();
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  const handleUpdate = async (id, productData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/dash/products/${id}`,
        productData
      );
      await loadProducts();
      setShowForm(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/dash/products/${id}`);
        await loadProducts();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Product Management
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 
                          focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
              />
            </div>
            {/* Add Product Button */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg
                        hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
              {error}
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No products found
            </div>
          ) : (
            <div className="space-y-6">
              <ProductList
                products={currentProducts}
                onEdit={(product) => {
                  setSelectedProduct(product);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <Pagination
                  totalPages={Math.ceil(
                    filteredProducts.length / productsPerPage
                  )}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>

        {/* Product Form Modal */}
        <ProductForm
          show={showForm}
          product={selectedProduct}
          onHide={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
          onSubmit={
            selectedProduct
              ? (data) => handleUpdate(selectedProduct._id, data)
              : handleCreate
          }
        />
      </div>
    </div>
  );
};

export default ProductManagement;
