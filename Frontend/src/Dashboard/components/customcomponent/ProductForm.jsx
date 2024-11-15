import React, { useEffect, useState } from "react";

const ProductForm = ({ show, onHide, product, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    photos: "",
    flavour: "",
    size: "",
    quantities: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        brand: product.brand || "",
        category: product.category || "",
        photos: product.photos.join(", ") || "",
        flavour: product.flavour.join(", ") || "",
        size: product.size.join(", ") || "",
        quantities: product.quantities.join(", ") || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        photos: "",
        flavour: "",
        size: "",
        quantities: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = { ...formData };

    // Process quantities, flavour, and size into arrays
    processedData.quantities = processedData.quantities
      .split(",")
      .map((item) => parseInt(item.trim(), 10));
    processedData.flavour = processedData.flavour
      .split(",")
      .map((item) => item.trim());
    processedData.size = processedData.size
      .split(",")
      .map((item) => item.trim());
    processedData.photos = processedData.photos
      .split(",")
      .map((item) => item.trim());

    onSubmit(processedData);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${
        show ? "block" : "hidden"
      }`}
      onClick={onHide}
    >
      <div
        className="bg-white w-full sm:w-96 p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="category"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="photos"
            >
              Image URLs (comma separated)
            </label>
            <input
              type="text"
              name="photos"
              id="photos"
              value={formData.photos}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="flavour"
            >
              Flavours (comma separated)
            </label>
            <input
              type="text"
              name="flavour"
              id="flavour"
              value={formData.flavour}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="size"
            >
              Sizes (comma separated)
            </label>
            <input
              type="text"
              name="size"
              id="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="quantities"
            >
              Quantities (comma separated)
            </label>
            <input
              type="text"
              name="quantities"
              id="quantities"
              value={formData.quantities}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onHide}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
