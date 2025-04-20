import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../ui/Modal/Modal";
import styles from "./ProductModal.module.css";
import Button from "../ui/Button/Button";

interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  category?: string;
  image?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  initialData?: Product | null;
}

const productSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Must be a number")
    .required("Price is required"),
  category: Yup.string(),
  image: Yup.string().url("Must be a valid URL"),
});

const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProductModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Modal
      title={initialData ? "Edit Product" : "Add Product"}
      onClose={onClose}
    >
      <Formik
        initialValues={{
          title: initialData?.title || "",
          description: initialData?.description || "",
          price: initialData?.price || 0,
          category: initialData?.category || "",
          image: initialData?.image || "",
        }}
        validationSchema={productSchema}
        onSubmit={(values) => {
          onSubmit({ ...initialData, ...values });
          onClose();
        }}
      >
        <Form className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <Field name="title" className={styles.input} />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <Field
              name="description"
              as="textarea"
              className={`${styles.textarea}`}
            />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              Price
            </label>
            <Field name="price" type="number" className={styles.input} />
            <ErrorMessage
              name="price"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Category (optional)
            </label>
            <Field name="category" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image" className={styles.label}>
              Image URL (optional)
            </label>
            <Field name="image" className={styles.input} />
            <ErrorMessage
              name="image"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <Button
              type="submit"
              onClick={() => {}}
              label={initialData ? "Save Changes" : "Create"}
            />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ProductModal;
