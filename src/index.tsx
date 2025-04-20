import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import ProductsPage from "./pages/Products/ProductsPage";
import { startTokenValidation, validateToken } from "./utils/authUtils";
import ProductDetailPage from "./pages/Products/Product/ProductDetailPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

console.log(store.getState().auth.isAuthenticated);
if (store.getState().auth.isAuthenticated) {
  validateToken();
  startTokenValidation();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "products/:productId",
            element: <ProductDetailPage />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
