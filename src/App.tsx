import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import LogoutButton from "./components/Logout/Logout";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="App">
      <header className="App-header">
        <h1>hi</h1>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
