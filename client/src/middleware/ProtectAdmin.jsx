import { useContext } from "react";
import { UserContext } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const UnAuthorizedAdmin = ({ children }) => {
  const url = localStorage.getItem("redirect_url") || "/";
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to={url}
        replace={true}
      />
    );
  }

  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  return decodedToken?.role === "admin" ? (
    children
  ) : (
    <Navigate
      to={url}
      replace={true}
    />
  );
};

export const Auth = ({ children }) => {
  const url = localStorage.getItem("redirect_url") || "/";
  const token = localStorage.getItem("token");

  if (token) {
    return (
      <Navigate
        to={url}
        replace={true}
      />
    );
  }

  return children;
};
