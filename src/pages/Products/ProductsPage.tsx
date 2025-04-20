import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/Products/ProductCard";
import ProductModal from "../../components/Products/ProductModal";
import Button from "../../components/ui/Button/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { onLoad, onSuccess } from "../../redux/slices/crudStateSlice";
import Loading from "../../components/ui/Loading/Loading";
import Pagination from "../../components/ui/Pagination/Pagination";
import axiosInstance from "../../lib/axios";
import Modal from "../../components/ui/Modal/Modal";
import Dropdown from "../../components/ui/DropDown/DropDown";

import styles from "./ProductsPage.module.css"; // 👈 import the CSS module

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
}

interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category?: string;
  image?: string;
  id?: number;
  images?: string[];
}

type Category = {
  slug: string;
  name: string;
  url: string;
};

const pageSize = 10;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.crudState);

  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchPosts = async (page: number) => {
    dispatch(onLoad());

    try {
      const skip = (page - 1) * pageSize;
      const params = new URLSearchParams({
        limit: pageSize.toString(),
        skip: skip.toString(),
      });

      if (sortOrder) {
        params.append("sortBy", "price");
        params.append("order", sortOrder);
      }

      const endpoint = categoryFilter
        ? `/products/category/${categoryFilter}`
        : "/products";

      const res = await axiosInstance.get(`${endpoint}?${params.toString()}`);

      setProducts(res.data.products);
      setTotalItems(res.data.total);

      dispatch(
        onSuccess({ message: "Fetched Products Successfully", type: "success" })
      );
    } catch (error) {
      dispatch(
        onSuccess({ message: "Error fetching products", type: "error" })
      );
      console.error("Error fetching products:", error);
    }
  };

  const handleCreate = async (product: ProductFormData) => {
    dispatch(onLoad());

    try {
      const { image, ...rest } = product;
      const body = {
        ...rest,
        images: rest.images ? [...rest.images, image] : image ? [image] : [],
      };
      const response = await axiosInstance.post("/products/add", product);
      setProducts([response.data, ...products]);
      dispatch(
        onSuccess({ message: "Created Post Successfully", type: "success" })
      );

      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts.pop();
        return updatedProducts;
      });
    } catch (error) {
      dispatch(onSuccess({ message: "Error creating product", type: "error" }));
      console.error("Error creating product:", error);
    }

    setModalOpen(false);
  };

  const handleEdit = async (product: ProductFormData) => {
    dispatch(onLoad());

    try {
      if (!product.id) {
        throw new Error("Product ID is required for editing");
      }

      const { id, image, ...rest } = product;
      const body = {
        ...rest,
        images: rest.images ? [...rest.images, image] : image ? [image] : [],
      };
      const response = await axiosInstance.patch(`/products/${id}`, body);
      setProducts(products.map((p) => (p.id === id ? response.data : p)));
      dispatch(
        onSuccess({ message: "Edited Post Successfully", type: "success" })
      );
    } catch (error) {
      dispatch(onSuccess({ message: "Error editing product", type: "error" }));
      console.error("Error editing product:", error);
    }

    setModalOpen(false);
  };

  const handleDelete = async (productId: number) => {
    dispatch(onLoad());

    try {
      await axiosInstance.delete(`/products/${productId}`);
      dispatch(
        onSuccess({ message: "Deleted Post Successfully", type: "success" })
      );
      //fetchPosts(currentPage); // Uncomment this line if you want to refetch products after deletion, also it brings back the post that was deleted
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      dispatch(onSuccess({ message: "Error deleting product", type: "error" }));
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, sortOrder, categoryFilter]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/products/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const totalPages = Math.ceil(totalItems / pageSize);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className={styles.pageTitle}>Products</h2>
      <div className={styles.controlsContainers}>
        <div className={styles.controlsWrapper}>
          <Dropdown
            label="Category"
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat.slug,
            }))}
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value)}
          />
          <Dropdown
            label="Sort by Price"
            options={[
              { label: "Low to High", value: "asc" },
              { label: "High to Low", value: "desc" },
            ]}
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            setEditProduct(null);
            setModalOpen(true);
          }}
          label="Add Product"
        />
      </div>
      <div className={styles.productsWrapper}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setEditProduct={setEditProduct}
            setProductId={setProductId}
            setModalOpen={setModalOpen}
            setShowDeleteModal={setShowDeleteModal}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(product) => {
          if (editProduct) {
            handleEdit(product);
          } else {
            handleCreate(product);
          }
        }}
        initialData={editProduct}
      />
      {showDeleteModal && (
        <Modal
          title="Are you sure you want to delete this product?"
          onClose={() => setShowDeleteModal(false)}
        >
          <div className={styles.modalButtons}>
            <Button
              type="button"
              label="Cancel"
              onClick={() => setShowDeleteModal(false)}
            />
            <Button
              isDelete={true}
              label="Delete"
              onClick={() => {
                if (productId !== null) {
                  handleDelete(productId);
                }
                setShowDeleteModal(false);
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductsPage;
