import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

// Define a Layout component to handle the shared layout
const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {/* Render Header only if not on login or register pages */}
      {path !== "/login" && path !== "/register" && <Header />}
      <Outlet /> {/* This is where child routes will be rendered */}
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Wrap routes with the Layout
      children: [
        {
          index: true, // This will render Home as the default route
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
