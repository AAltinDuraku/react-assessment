import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import Button from "../Button/Button";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  setEditProduct: (product: Product) => void;
  setModalOpen: (open: boolean) => void;
  setShowDeleteModal: (show: boolean) => void;
  setProductId: (id: number) => void;
}

const ProductCard = ({
  product,
  setEditProduct,
  setModalOpen,
  setShowDeleteModal,
  setProductId,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const discountedPrice = (
    product.price -
    (product.price * (product.discountPercentage ?? 1)) / 100
  ).toFixed(2);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.productCard} onClick={handleCardClick}>
      <div>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.category}>
          <span>Category:</span> {product.category}
        </p>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.rating}>
          <span>Rating: </span> {product.rating} ⭐
        </p>
        <p className={styles.price}>
          Price:{" "}
          {product?.discountPercentage && (
            <span className={styles.originalPrice}>${product.price}</span>
          )}
          <span className={styles.discountedPrice}>${discountedPrice}</span>
        </p>
      </div>

      <div>
        <Button
          type="button"
          label="Edit"
          onClick={(e) => {
            e?.stopPropagation();
            setEditProduct(product);
            setModalOpen(true);
          }}
        />
        <Button
          type="button"
          label="Delete"
          onClick={(e) => {
            e?.stopPropagation();
            setProductId(product.id);
            setShowDeleteModal(true);
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
