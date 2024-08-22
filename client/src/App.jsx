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
import AdminHome from "./admin/pages/AdminHome";
import { Auth, UnAuthorizedAdmin } from "./middleware/ProtectAdmin";


// Define a Layout component to handle the shared layout
const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {/* Render Header only if not on login or register pages */}
      {path !== "/login" &&
        path !== "/register" &&
        path !== "/admin/dashboard" && <Header />}
      <Outlet /> {/* This is where child routes will be rendered */}
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Auth><Login /></Auth>,
        },
        {
          path: "register",
          element: <Auth><Register /></Auth>,
        },
        {
          path: "admin/dashboard",
          element: <UnAuthorizedAdmin><AdminHome /></UnAuthorizedAdmin>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
