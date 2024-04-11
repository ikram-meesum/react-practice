import React, { useState, useEffect } from "react";
import { app } from "../component/connection";
import Navbar from "./Navbar";
// import dayjs from "dayjs";
import { DynamicStar } from "react-dynamic-star";

import { collection, getDocs, getFirestore, addDoc } from "firebase/firestore";
import dayjs from "dayjs";

export default function AllProduct() {
  const [allProduct, setAllProduct] = useState([]);
  const db = getFirestore(app);

  const products = [];

  const getProduct = async () => {
    const querySnapshot = await getDocs(collection(db, "product"));
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    setAllProduct(products);
    console.log("prod line 37: ", products);
    // console.log("state: ", allProduct);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-semibold text-center uppercase text-slate-800 mt-10 mb-8">
        All Products
      </h1>
      <div className="border rounded-lg mx-5 mt-10 overflow-hidden shadow-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-slate-900 rounded-lg text-white">
              <th scope="col" className="pl-5 w-16 py-3">
                S #
              </th>
              <th scope="col" className="px-2 py-3">
                IMAGE
              </th>
              <th scope="col" className="pl-5 w-60 py-3">
                PRODUCT NAME
              </th>
              <th scope="col" className="pl-5 py-3">
                PRODUCT DETAIL
              </th>
              <th scope="col" className="w-24 pl-6 py-3">
                PRICE
              </th>
              <th scope="col" className="pr-5 w-32 py-3">
                CREATED AT
              </th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((prod, ind) => {
              return (
                <tr
                  key={ind}
                  className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                >
                  <td className="pl-5 py-3">{ind + 1}</td>
                  <td className="px-2 py-3">
                    <img src={prod.pimage} width={"50px"} height={"50px"} />
                  </td>

                  <td className="pl-5 font-medium text-gray-900">
                    {/* {prod.productname.substring(0, 35)}... */}
                    {prod.productname}
                    <DynamicStar
                      rating={prod.rating}
                      emptyStarColor="#cdcdcd"
                      fullStarColor="#00a8ff"
                      width={12}
                      height={12}
                    />
                  </td>
                  <td className="pl-5 py-3">
                    {prod.detail.length > 350
                      ? prod.detail.substring(0, 350) + "..."
                      : prod.detail}
                  </td>

                  <td className="pl-6 text-slate-800 font-semibold py-3">
                    $ {prod.price}
                  </td>

                  <td className="mr-6 py-3">
                    {dayjs(todo.createdAt).format("DD-MMM-YYYY")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
