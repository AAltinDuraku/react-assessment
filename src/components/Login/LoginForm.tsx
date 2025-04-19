import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../ui/Button/Button";

type LoginFormValues = {
  username: string;
  password: string;
};

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("usernam is required"),
  password: Yup.string().required("Password is required"),
});

interface Props {
  onSubmit: (values: LoginFormValues) => void;
}

const LoginForm = ({ onSubmit }: Props) => {
  return (
    <div className="max-w-md w-full p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <Button label="Login" type="submit" onClick={() => {}} />
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
