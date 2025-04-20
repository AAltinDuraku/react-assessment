Architecture and State Management

The project follows a modular architecture with the following structure:

components/: Reusable UI componenents, and other compoents.
pages/: Page-level components for routing (e.g., LoginPage, HomePage, ProductsPage and dynamic product page).
redux/: Redux store configuration and slices for state management.
utils/: Utility functions (e.g., authUtils for token validation).
App.tsx: The root component that initializes the app.
index.tsx: Entry point for rendering the app and setting up the router and Redux provider.
State Management
The application uses Redux for global state management:

Authentication State: Managed in the auth slice, which tracks isAuthenticated and user-related data.
Token Validation: Utility functions (validateToken, startTokenValidation) ensure the user's session remains valid.
React-Redux Hooks: useSelector and useDispatch are used to interact with the Redux store.
Design and Implementation Decisions
Protected Routes

The ProtectedRoute component ensures that only authenticated users can access certain routes. It uses Redux to check the isAuthenticated state and redirects unauthenticated users to the login page.
Reusable Components

Components like Button are designed to be reusable and customizable with props, ensuring consistency across the app.


Routing:
React Router v6 is used for routing, with nested routes for better organization and scalability.
TypeScript

TypeScript is used throughout the project to ensure type safety and reduce runtime errors.
Token Validation:
Token validation is performed during app initialization to maintain session integrity. This ensures that users with expired or invalid tokens are logged out automatically.

Scalability:
The project is designed to be scalable, with a clear folder structure and modular components.
