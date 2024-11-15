import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [productsPerPage] = useState(5); // Changed to match users component

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
      alert("Product created successfully!");
    } catch (err) {
      alert("Failed to create product. Please try again.");
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
      alert("Product updated successfully!");
    } catch (err) {
      alert("Failed to update product. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/dash/products/${id}`);
        await loadProducts();
        alert("Product deleted successfully!");
      } catch (err) {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination values
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-xl font-bold text-orange-500 mb-4">
        Product Management
      </h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          Add New Product
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <ProductList
            products={currentProducts}
            onEdit={(product) => {
              setSelectedProduct(product);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
          <Pagination
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

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
  );
};

export default ProductManagement;
