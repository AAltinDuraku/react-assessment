import { useDispatch } from "react-redux";
import { LoginForm } from "../../components/Login";
import { loginApi } from "../../lib/loginApi";
import { Navigate, useNavigate } from "react-router-dom";
import { loginFailure, loginSuccess } from "../../redux/slices/AuthState";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { startTokenValidation } from "../../utils/authUtils";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onLogin = (values: { username: string; password: string }) => {
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
        navigate("/");
        alert("Login successful");
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenTimestamp");

        dispatch(loginFailure(error.message));
        alert("Login failed: " + error.message);

        console.error(error);
        alert(error);
      });
  };
  return (
    <div>
      <LoginForm onSubmit={onLogin} />
    </div>
  );
};

export default Login;
