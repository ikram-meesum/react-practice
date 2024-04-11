import React, { useState, useEffect } from "react";
import { DynamicStar } from "react-dynamic-star";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { BiSolidMessageAltDetail } from "react-icons/bi";

import { app } from "./connection";
import dayjs from "dayjs";
import { getDocs, doc, getFirestore, collection } from "firebase/firestore";
import Footer from "./Footer";

export default function Content() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const db = getFirestore(app);
  const alldata = [];

  const getProduct = async () => {
    const ref = collection(db, "product");
    const res = await getDocs(ref);

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
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mt-14 text-slate-900 mb-10 text-center">
        ALL PRODUCTS AVAILABLE
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {allProducts.map((pro, ind) => {
          return (
            <div key={ind}>
              <section className="">
                <div className="p-2 flex items-center justify-center">
                  <div className="bg-white w-full rounded-lg overflow-hidden shadow-xl ">
                    {/* <div className="h-48 bg-cover bg-center" style="background-image:url('https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80')"></div>--> */}
                    <div className="rounded-lg flex justify-center items-center overflow-hidden">
                      <img
                        // height={"50px"}
                        className="h-64 hover:opacity-80 hover:cursor-pointer pt-5 pr-3 pl-3"
                        src={pro.pimage}
                        // src="https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
                        alt="Home in Countryside"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-baseline">
                        {/* <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
                          New
                        </span> */}
                        <div className="text-gray-600 text-xs uppercase font-semibold tracking-wide">
                          {dayjs(pro.createdAt).format("DD-MMM-YYYY")}
                        </div>
                      </div>
                      <h4 className="mt-2 font-semibold text-base leading-tight truncate">
                        {pro.productname}
                      </h4>

                      <div className="mt-1">
                        <span>${pro.price}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-semibold">
                          <DynamicStar
                            rating={pro.rating}
                            emptyStarColor="#cdcdcd"
                            fullStarColor="#00a8ff"
                            width={16}
                            height={16}
                          />
                        </span>

                        <div className="flex border duration-300 text-slate-800 hover:cursor-pointer hover:bg-blue-500 px-4 py-1 text-sm hover:text-white rounded">
                          <BiSolidMessageAltDetail className="mt-1" />
                          &nbsp;
                          <Link to={`/detail/${pro.id}`}>Detail</Link>
                        </div>
                      </div>
                      {/* start btton */}
                      <div className="mt-3">
                        <button className="bg-slate-800 font-semibold px-4 py-1 text-white rounded-md">
                          Add to Cart
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
      <Footer />
    </>
  );
}
