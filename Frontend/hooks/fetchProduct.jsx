import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data); // Store the fetched product data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export default useFetchProduct;
