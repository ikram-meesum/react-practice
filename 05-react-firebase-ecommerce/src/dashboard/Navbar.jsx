import React, { useEffect, useState } from "react";
// import { IoCart } from "react-icons/io5";
// import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userinfo") === null) {
      setIsLogin(false);
      console.log("in");
    } else {
      setIsLogin(true);
      console.log("out");
    }
  }, []);

  const logout = () => {
    console.log("logot");
    navigate("dashboard/logout");
  };

  return (
    <section>
      <header className="flex items-center justify-between py-4 shadow-lg bg-slate-900 text-white">
        <div>
          <a href="/">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold sm:block ml-10">
                <span className="text-blue-400">DASH</span>
                <span>BOARD</span>
              </div>
            </div>
          </a>
        </div>

        <div className="flex space-x-2 mr-8">
          {isLogin == true ? (
            <>
              <div
                className={
                  location.pathname == `/dashboard/category`
                    ? "py-2 px-2 text-sm flex bg-gray-800 rounded-md"
                    : "py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
                }
                // className="py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
              >
                <Link to={"/dashboard/category"}>Category</Link>
              </div>

              <div
                className={
                  location.pathname == `/dashboard/product`
                    ? "py-2 px-2 text-sm flex bg-gray-800 rounded-md"
                    : "py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
                }
                //  className="py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
              >
                <Link to={"/dashboard/product"} className="">
                  Products
                </Link>
              </div>

              <div
                className={
                  location.pathname == `/dashboard/allproduct`
                    ? "py-2 px-2 text-sm flex bg-gray-800 rounded-md"
                    : "py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
                }
                // className="py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
              >
                <Link to={"/dashboard/allproduct"} className="">
                  All Products
                </Link>
              </div>
            </>
          ) : (
            <div
              className={
                location.pathname == `/dashboard/signup`
                  ? "py-2 px-2 text-sm flex bg-gray-800 rounded-md"
                  : "py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
              }
              // className="py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
            >
              <Link to={"/dashboard/signup"} className="">
                Signup
              </Link>
            </div>
          )}

          <div
            className={
              location.pathname == `/dashboard`
                ? "py-2 px-2 text-sm flex bg-gray-800 rounded-md"
                : "py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
            }
            // className="py-2 px-2 text-sm flex hover:bg-gray-800 rounded-md"
          >
            {isLogin == true ? (
              <button onClick={() => navigate("/dashboard/logout")}>
                Logout
              </button>
            ) : (
              <button onClick={() => navigate("/dashboard")}>Login</button>
            )}
          </div>
        </div>
      </header>
    </section>
  );
}
