import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import LogoutButton from "./components/Logout/Logout";
import { useEffect } from "react";
import { clearMessage } from "./redux/slices/crudStateSlice";
import { useDispatch } from "react-redux";
import Message from "./components/ui/SuccessAndError/Message";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { message, messageType } = useSelector(
    (state: RootState) => state.crudState
  );

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        return dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>React Assessment</h1>{" "}
          {/* This should NOT be a h1, a logo or sum */}
          <nav className="navLinks">
            <ul>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <LogoutButton />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>{" "}
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mainContainer">
        {message && (
          <p>
            <Message type={messageType ?? "success"} text={message} />
          </p>
        )}
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
