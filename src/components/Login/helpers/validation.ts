import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[A-Za-z_][A-Za-z0-9_]*$/,
      "Username must not start with a number and can only contain letters, numbers, and underscores"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});
