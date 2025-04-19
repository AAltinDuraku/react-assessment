import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/AuthState";
import Button from "../ui/Button/Button";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenTimestamp");

    navigate("/login");
  };

  return <Button onClick={handleLogout} label="Log out" />;
};

export default LogoutButton;
