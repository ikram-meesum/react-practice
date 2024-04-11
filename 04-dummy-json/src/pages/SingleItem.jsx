import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { DynamicStar } from "react-dynamic-star";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { Fade } from "react-awesome-reveal";
import toast, { Toaster } from "react-hot-toast";

export default function SingleItem() {
  const [allProducts, setAllProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const [showModal, setShowModal] = React.useState(false);
  const { id } = useParams();
  //   console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((json) => {
        // console.log("json: ", json);
        setAllProducts(json);
        setIsLoading(false);
      });
  }, []);

  const goBack = () => {
    navigate("/");
  };

  var todoAry = [];

  const addToCart = (data) => {
    toast.success("Item has been added to cart!");

    console.log("add to cart: ", data);
    todoAry.push(data);
    todoAry = todoAry.concat(
      JSON.parse(sessionStorage.getItem("cart") || "[]")
    );
    sessionStorage.setItem("cart", JSON.stringify(todoAry));
  };

  return (
    <>
      {isLoading == true ? (
        <div className="w-32 mt-36 border mx-auto">
          <ReactLoading type={"bars"} color={"gray"} height={40} width={50} />
        </div>
      ) : (
        <section>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              success: {
                style: {
                  background: "#90EE90",
                  color: "black",
                },
              },
            }}
          />
          <Fade>
            <h1 className="text-center mt-4 mx-4 text-2xl text-gray-700 font-bold py-4">
              Product Details
            </h1>
            <div className="pt-6 pb-12 mx-8">
              <div className="flex justify-between mb-3">
                <div></div>
                <button
                  onClick={goBack}
                  className="border bg-slate-900 text-white font-semibold hover:bg-slate-800 hover:text-gray-300 duration-300 px-6 py-2 rounded-md text-sm"
                >
                  Back
                </button>
              </div>

              <div id="card" className="">
                <div className="container w-100 mx-auto flex flex-col">
                  <div
                    v-for="card in cards"
                    className="flex flex-col md:flex-row overflow-hidden
                                        bg-gray-50 rounded-lg shadow-xl  mt-4 w-100 mx-2"
                  >
                    <div className="h-64 w-auto ">
                      <img
                        className="h-full w-full"
                        src={allProducts.thumbnail}
                      />
                    </div>

                    <div className="w-full py-4 px-6">
                      <section className="flex justify-between">
                        <h3 className="font-semibold text-2xl text-gray-700 leading-tight truncate">
                          {allProducts.title}
                        </h3>
                        <p className="bg-red-200 text-sm rounded-md px-4 py-1">
                          {" "}
                          {allProducts.brand}
                        </p>
                      </section>

                      <p className="mt-2 text-gray-500 text-sm mb-2">
                        {allProducts.description}
                      </p>
                      {/* <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                  {"card.author"} &bull; {"card.date"}
                </p> */}
                      <p className="font-semibold text-sm text-slate-700 mb-2">
                        US$.{allProducts.price}
                      </p>
                      <div>
                        <DynamicStar
                          rating={allProducts.rating}
                          emptyStarColor="#2B3856"
                          width={15}
                          height={15}
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <p className="bg-slate-900 text-sm text-gray-300 w-40 text-center rounded-md px-3 py-2">
                          Stock Qty: {allProducts.stock}
                        </p>
                        <p className="bg-slate-900 text-sm text-gray-300 w-48 text-center rounded-md px-3 py-2">
                          Discount: US$ {allProducts.discountPercentage}%
                        </p>
                        <p className="bg-slate-900 text-sm text-gray-300 w-48 text-center rounded-md px-1 py-2">
                          Category: {allProducts.category}
                        </p>
                      </div>

                      <div className="mt-5">
                        <button
                          onClick={() => addToCart(allProducts)}
                          className="bg-blue-500 text-white flex px-6 py-2 w-40 hover:bg-blue-600 duration-300 rounded-md text-sm"
                        >
                          <IoCart className="mt-1 mr-2" />
                          <p>Add to cart</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
          <div className="flex justify-around">
            <img
              src={allProducts.images[0]}
              className="border rounded-lg"
              width={"150px"}
              height={"200px"}
            />
            <img
              src={allProducts.images[1]}
              className="border rounded-lg"
              width={"150px"}
              height={"200px"}
            />
            <img
              src={allProducts.images[2]}
              className="border rounded-lg"
              width={"150px"}
              height={"200px"}
            />
            <img
              src={allProducts.images[3]}
              className="border rounded-lg"
              width={"150px"}
              height={"200px"}
            />
          </div>
        </section>
      )}
    </>
  );
}
