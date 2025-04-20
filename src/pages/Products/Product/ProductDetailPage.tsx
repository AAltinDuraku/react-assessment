import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetailPage.module.css";
import axiosInstance from "../../../lib/axios";

interface Product {
  productId: string;
  title: string;
  category: string;
  description: string;
  rating: number;
  price: number;
}

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const discountedPrice = (product.price * 0.9).toFixed(2); // Assuming a 10% discount

  return (
    <div className={styles.productDetail}>
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.category}>
        <span>Category:</span> {product.category}
      </p>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.rating}>
        <span>Rating: </span> {product.rating} ⭐
      </p>
      <p className={styles.price}>
        Price: <span className={styles.originalPrice}>${product.price}</span>{" "}
        <span className={styles.discountedPrice}>${discountedPrice}</span>
      </p>
    </div>
  );
};

export default ProductDetailPage;
