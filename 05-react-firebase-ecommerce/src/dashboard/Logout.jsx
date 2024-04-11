import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  sessionStorage.removeItem("userinfo");

  setTimeout(() => {
    navigate("/dashboard");
  }, 3000);

  return (
    <section>
      <Navbar />
      <h2 className="text-center text-3xl text-slate-800 mt-20">
        You are logout{" "}
      </h2>
    </section>
  );
}
