import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { DynamicStar } from "react-dynamic-star";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

export default function Content() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((json) => {
        console.log("json: ", json.products);
        setAllProducts(json.products);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading == true ? (
        <div className="w-32 mx-auto">
          <ReactLoading type={"bars"} color={"gray"} height={40} width={50} />
        </div>
      ) : (
        <section>
          <Fade>
            <h2 className="text-center text-3xl font-semibold text-slate-800 my-6 py-4">
              Available Products
            </h2>
            <div className="grid grid-cols-3 gap-4 mx-7">
              {allProducts.length > 0 &&
                allProducts.map((product, index) => {
                  return (
                    <div key={index} className="mb-6 border rounded-lg">
                      <img
                        className="rounded-t-lg h-52 w-full transition duration-300 ease-in-out hover:opacity-80"
                        src={product.thumbnail}
                        alt={product.thumbnail}
                      />
                      <div className="bg-slate-950 p-5 text-white h-52 rounded-b-lg">
                        <p className="text-red-300 text-sm">{product.brand}</p>
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
        </section>
      )}
    </>
  );
}
