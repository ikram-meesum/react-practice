import React, { useState, useEffect } from "react";
// import "../App.css";
import { IoCart } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";

export default function TopButton() {
  const [showModal, setShowModal] = useState(false);
  const [allCart, setAllCart] = useState([]);

  // const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
  // // todoAry = todoAry.concat(JSON.parse(localStorage.getItem("todos") || "[]"));
  // console.log("test cart", cartItems);
  // setAllCart(cartItems);

  let cartItems = null;
  // setTimeout(() => {
  //   console.log("time out");
  //   cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
  //   // todoAry = todoAry.concat(JSON.parse(localStorage.getItem("todos") || "[]"));
  //   console.log("test cart", cartItems);
  //   setAllCart(cartItems);
  // }, 2000);

  useEffect(() => {
    // setTimeout(() => {
    console.log("time out");
    cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
    // todoAry = todoAry.concat(JSON.parse(localStorage.getItem("todos") || "[]"));
    console.log("test cart", cartItems);
    setAllCart(cartItems);
    // }, 2000);
  }, []);

  return (
    <section className="">
      <header
        // style={{ height: "calc( 100vh - 120 ) !important;" }}
        className="flex items-center justify-between py-4 shadow-lg bg-slate-900 text-white"
      >
        <div>
          <a href="/">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold sm:block ml-10">
                <span className="text-blue-400">dummy</span>
                <span>json</span>
              </div>
            </div>
          </a>
        </div>

        <input
          type="search"
          id="default-search"
          // value={""}
          //onChange={(e) => setTodoText(e.target.value)}
          className="block w-72 p-2 ps-5 text-sm text-gray-300 rounded-lg bg-gray-800"
          placeholder="Search..."
          required
        />

        <div className="flex space-x-4 mr-8">
          <div className="py-2 px-4 text-sm border flex border-gray-600 rounded">
            <p>
              <BiLogIn className="mt-1 mr-2" />
            </p>
            <p>Login</p>
          </div>

          <div className="py-2 px-4 text-sm border flex border-gray-600 rounded">
            <p>
              <IoCart className="mt-1 mr-2" />
            </p>

            <button
              className=""
              type="button"
              onClick={() => setShowModal(true)}
            >
              Cart
            </button>
            {/* <button
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Cart
            </button> */}
          </div>
        </div>
      </header>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Shopping Cart</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-blue text-black h-6 w-6 text-2xl block">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {allCart.map((cart, ind) => {
                      return (
                        <p
                          key={ind}
                          className="border rounded-md flex justify-between text-left p-3 mb-2"
                        >
                          <img
                            src={cart.thumbnail}
                            height={"80px"}
                            width={"80px"}
                          />
                          <p className="ml-2 text-sm text-gray-500 w-60 text-left">
                            <span className="text-slate-800 text-lg text-left font-semibold">
                              {cart.title}
                            </span>
                            <br />
                            {cart.description.substring(0, 60)}
                          </p>
                          <p className="text-slate-800 text-sm font-semibold">
                            US$ {cart.price}
                          </p>
                        </p>
                      );
                    })}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button> */}
                  <button
                    className="bg-blue-500 text-white font-bold hover:bg-blue-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </section>
  );
}
