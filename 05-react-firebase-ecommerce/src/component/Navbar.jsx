import React, { useState, useEffect } from "react";
// import "../App.css";
// import { IoCart } from "react-icons/io5";
// import { BiLogIn } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiDashboard3Fill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";

export default function TopButton() {
  // const [showModal, setShowModal] = useState(false);
  // const [allCart, setAllCart] = useState([]);

  let location = useLocation();

  useEffect(() => {
    console.log("time out");
  }, []);

  return (
    <section className="bg-gray-50 py-4 top-0 sticky z-10">
      <header className="container flex items-center justify-between">
        <Link to={"/"} className="text-lg uppercase font-bold">
          react<span className="text-red-500">firebase</span>
        </Link>

        <ul className="flex gap-0">
          <li
            className={
              location.pathname == `/`
                ? "bg-gray-100 rounded-md flex text-slate-500 hover:text-slate-700 hover:bg-gray-100 px-3 py-2 hover:rounded-md"
                : "hover:text-slate-800 flex text-slate-500 hover:bg-gray-100 px-3 py-2 hover:rounded-md"
            }
          >
            <FaHome className="mt-1" />
            &nbsp;
            <Link to={"/"}>Home</Link>
          </li>
          <li className="text-slate-500 flex hover:text-slate-700 px-3 py-2">
            <RiDashboard3Fill className="mt-1" />
            &nbsp;
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-slate-500 flex hover:text-slate-700 px-3 py-2">
            <FaCartArrowDown className="mt-1" />
            &nbsp;
            <Link to={"/"}>Cart</Link>
          </li>
        </ul>
      </header>
    </section>
  );
}
