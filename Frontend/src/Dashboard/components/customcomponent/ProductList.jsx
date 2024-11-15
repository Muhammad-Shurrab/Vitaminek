import React from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="py-2 px-4">
                <img
                  src={product.photos[0] || "/placeholder.jpg"} // Use the first image or a placeholder
                  alt={product.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="py-2 px-4">{product.title}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">
                {product.quantities.reduce((a, b) => a + b, 0)}
              </td>{" "}
              {/* Total stock from quantities */}
              <td className="py-2 px-4">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
