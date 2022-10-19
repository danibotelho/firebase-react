import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { useAuth } from "../hooks/useAuth";


export default function Router() {
  const { currentUser } = useAuth();

  const isLogged = () => {
    return currentUser?.id !== undefined;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {isLogged() ? (
            <>
              <Route index element={<Home />} />
            </>
          ) : (
            <>
              <Route index element={<Login />} />
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
