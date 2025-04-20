import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../ui/Button/Button";
import styles from "./LoginForm.module.css"; // Import CSS Module
import { validationSchema } from "./helpers/validation";

type LoginFormValues = {
  username: string;
  password: string;
};

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

interface Props {
  onSubmit: (values: LoginFormValues) => void;
}

const LoginForm = ({ onSubmit }: Props) => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage
              name="username"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.buttonWrapper}>
            <Button label="Login" type="submit" onClick={() => {}} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
