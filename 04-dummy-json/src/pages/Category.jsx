import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { DynamicStar } from "react-dynamic-star";
import Sidebar from "../component/Sidebar";
// import { FaBottleDroplet } from "react-icons/fa6";
import { Fade } from "react-awesome-reveal";
import SilkSlider from "../component/SilkSlider";
import { useLocation } from "react-router-dom";

export default function Category() {
  const [allProducts, setAllProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { catname } = useParams();
  let location = useLocation();
  //   const finalName = catname.slice(0, -1);

  //   console.log(`https://dummyjson.com/products/category/${catname}`);
  //   window.location.reload();

  useEffect(() => {
    console.log("path: ", location.pathname);
    setIsLoading(true);
    fetch(`https://dummyjson.com/products/category/${catname}`)
      .then((response) => response.json())
      .then((json) => {
        console.log("catname: ", json.products);
        setAllProducts(json.products);
        setIsLoading(false);
      });
  }, [catname]);

  return (
    <section>
      <Navbar />
      <SilkSlider />
      <div className="flex">
        <div className="flex-none w-56 h-14">
          <Sidebar />
        </div>
        <div className="flex-initial w-full p-4">
          {/* <Content /> */}
          {/* {allProducts.length > 0 ? <h1>item found</h1> : "NO ITEMS FOND"} */}
          <div className="text-center text-3xl font-semibold text-slate-800 my-6 py-5">
            Result for {catname}
          </div>
          <>
            {isLoading == true ? (
              <div className="w-32 mx-auto">
                <ReactLoading
                  type={"bars"}
                  color={"gray"}
                  height={40}
                  width={50}
                />
              </div>
            ) : (
              <Fade>
                <div className="grid grid-cols-3 gap-4 mx-7">
                  {allProducts.length > 0 &&
                    allProducts.map((product, index) => {
                      return (
                        <div key={index} className="mb-6 border rounded-lg">
                          <img
                            className="rounded-t-lg h-52 w-full"
                            src={product.thumbnail}
                            alt={product.thumbnail}
                          />
                          <div className="bg-slate-950 p-5 text-white h-52 rounded-b-lg">
                            <p className="text-red-300 text-sm">
                              {product.brand}
                            </p>
                            <h2 className="font-semibold">
                              {product.title.length <= 27
                                ? product.title
                                : product.title.substring(0, 27) + "..."}
                            </h2>
                            <p className="text-sm text-red-300">
                              US$.{product.price}
                            </p>
                            <p className="text-sm text-gray-500">
                              {product.description.length <= 70
                                ? product.description
                                : product.description.substring(0, 65) + "..."}
                              {/* {product.description.substring(0, 70)}... */}
                              {/* {product.description} */}
                            </p>
                            <div className="flex mt-2">
                              <DynamicStar
                                rating={product.rating}
                                emptyStarColor="#2B3856"
                                width={13}
                                height={13}
                              />{" "}
                            </div>
                            <br />
                            <span className="text-sm text-gray-400 rounded-md hover:cursor-pointer hover:bg-slate-800 bg-slate-900 px-4 py-1">
                              <Link to={`/detail/${product.id}`}>Details</Link>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Fade>
            )}
          </>
        </div>
      </div>

      {/* ==================== */}
    </section>
  );
}
