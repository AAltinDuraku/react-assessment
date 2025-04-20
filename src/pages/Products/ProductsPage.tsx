import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/Products/ProductCard";
import ProductModal from "../../components/Products/ProductModal";
import Button from "../../components/ui/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { onLoad, onSuccess } from "../../redux/slices/crudStateSlice";
import Loading from "../../components/ui/Loading/Loading";
import Pagination from "../../components/ui/Pagination/Pagination";
import axiosInstance from "../../lib/axios";
import Modal from "../../components/ui/Modal/Modal";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
}
const pageSize = 10;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.crudState);

  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);

  const fetchPosts = async (page: number) => {
    dispatch(onLoad());

    try {
      const res = await axiosInstance.get(
        `/products?limit=${pageSize}&skip=${(page - 1) * pageSize}`
      );
      dispatch(
        onSuccess({ message: "Fetched Posts Successfully", type: "success" })
      );
      setProducts(res.data.products);
      setTotalItems(res.data.total);
    } catch (error) {
      dispatch(
        onSuccess({ message: "Error fetching products", type: "error" })
      );
      console.error("Error fetching products:", error);
    }
  };

  const handleCreate = async (product: any) => {
    dispatch(onLoad());

    try {
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

  const handleEdit = async (product: any) => {
    dispatch(onLoad());

    try {
      const response = await axiosInstance.patch(
        `/products/${product.id}`,
        product
      );
      setProducts(
        products.map((p) => (p.id === product.id ? response.data : p))
      );
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
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      dispatch(onSuccess({ message: "Error deleting product", type: "error" }));
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / pageSize);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 style={{ fontSize: "36px", textAlign: "center", margin: "40px 0" }}>
        Products
      </h2>
      <div>
        <Button
          type="button"
          onClick={() => {
            setEditProduct(null);
            setModalOpen(true);
          }}
          label="Add Product"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5%",
        }}
      >
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
        onSubmit={editProduct ? handleEdit : handleCreate}
        initialData={editProduct}
      />
      {showDeleteModal && (
        <Modal
          title="Are you sure you want to delete this product?"
          onClose={() => setShowDeleteModal(false)}
        >
          <div>
            <Button
              type="button"
              label="Cancel"
              onClick={() => setShowDeleteModal(false)}
            />
            <Button
              type="button"
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
