import { useDispatch } from "react-redux";
import { LoginForm } from "../../components/Login";
import { loginApi } from "../../lib/loginApi";
import { Navigate, useNavigate } from "react-router-dom";
import { loginFailure, loginSuccess } from "../../redux/slices/AuthState";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { startTokenValidation } from "../../utils/authUtils";
import styles from "./LoginPage.module.css";
import { onError, onLoad, onSuccess } from "../../redux/slices/crudStateSlice";
import Loading from "../../components/ui/Loading/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.crudState);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onLogin = (values: { username: string; password: string }) => {
    dispatch(onLoad());
    loginApi(values)
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        const expirationDate = Date.now().toString();
        localStorage.setItem("tokenTimestamp", expirationDate);

        dispatch(
          loginSuccess({
            token: response.accessToken,
            user: {
              id: response.id,
              username: response.username,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
            },
            timeLoggedIn: expirationDate,
          })
        );

        startTokenValidation();
        dispatch(
          onSuccess({ message: "Logged in Successfully", type: "success" })
        );
        navigate("/");
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenTimestamp");
        dispatch(onError({ message: "Something went wrong!", type: "error" }));
        dispatch(loginFailure(error.message));
      });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <section className={styles.loginPage}>
        <LoginForm onSubmit={onLogin} />
      </section>
    </>
  );
};

export default Login;
