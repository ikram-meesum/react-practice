import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { DynamicStar } from "react-dynamic-star";

import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import { app } from "../component/connection";
import dayjs from "dayjs";
import {
  getDocs,
  doc,
  getFirestore,
  collection,
  query,
  where,
} from "firebase/firestore";
import Hero from "../component/Hero";

export default function Category() {
  const { catid } = useParams();
  // console.log(catid);

  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { catname } = useParams();
  // let location = useLocation();

  const db = getFirestore(app);
  const alldata = [];

  const getProduct = async () => {
    const q = query(
      collection(db, "product"),
      where("catId", "==", `${catid}`)
    );
    const res = await getDocs(q);
    res.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      alldata.push({ id: doc.id, ...doc.data() });
    });
    console.log("prodct: ", alldata);
    setAllProducts(alldata);
  };

  useEffect(() => {
    setIsLoading(true);
    getProduct();
    setIsLoading(false);
  }, [catid]);

  return (
    <main className="bg-gray-50">
      <section className="w-5/6 m-auto">
        <Navbar />
        <Hero />

        <div className="flex">
          <div className="flex-initial w-full p-4">
            <div className="text-center text-3xl font-semibold text-slate-800 my-6 py-5">
              {allProducts.length <= 0
                ? "No result found"
                : "Result of selected category"}
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
                          <div key={index}>
                            <section className="">
                              <div className="p-2 flex items-center justify-center">
                                <div className="bg-white w-full rounded-lg overflow-hidden shadow-xl ">
                                  {/* <div className="h-48 bg-cover bg-center" style="background-image:url('https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80')"></div>--> */}
                                  <div className="rounded-lg flex justify-center items-center overflow-hidden">
                                    <img
                                      className="h-64 hover:opacity-80 hover:cursor-pointer pt-5 pr-3 pl-3"
                                      src={product.pimage}
                                      alt="Home in Countryside"
                                    />
                                  </div>
                                  <div className="p-6">
                                    <div className="flex items-baseline">
                                      <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide">
                                        {dayjs(product.createdAt).format(
                                          "DD-MMM-YYYY"
                                        )}
                                      </div>
                                    </div>
                                    <h4 className="mt-2 font-semibold text-base leading-tight truncate">
                                      {product.productname}
                                    </h4>

                                    <div className="mt-1">
                                      <span>${product.price}</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                      <span className="font-semibold">
                                        <DynamicStar
                                          rating={product.rating}
                                          emptyStarColor="#cdcdcd"
                                          fullStarColor="#00a8ff"
                                          width={16}
                                          height={16}
                                        />
                                      </span>

                                      <Link
                                        to={`/detail/${product.id}`}
                                        className="border font-semibold text-slate-800 border-blue-500 hover:cursor-pointer hover:bg-blue-600 px-4 py-1 text-sm hover:text-white rounded"
                                      >
                                        Detail
                                      </Link>
                                    </div>
                                    {/* start btton */}
                                    <div className="mt-3">
                                      <button className="bg-slate-800 font-semibold px-4 py-1 text-white rounded-md">
                                        Add to cart
                                      </button>
                                    </div>
                                    {/* end button */}
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        );
                      })}
                  </div>
                </Fade>
              )}
            </>
          </div>
        </div>
      </section>
    </main>
  );
}
