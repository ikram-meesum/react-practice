import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import SingleItem from "./SingleItem";
import SilkSlider from "../component/SilkSlider";
import Hero from "../component/Hero";
import { Link, useParams } from "react-router-dom";
import { DynamicStar } from "react-dynamic-star";
// import { app } from "./connection";
import { app } from "../component/connection";
import dayjs from "dayjs";
import {
  getDocs,
  doc,
  getFirestore,
  collection,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import Footer from "../component/Footer";

export default function Detail() {
  const { id } = useParams();
  // console.log("params:", id);

  const [products, setProduct] = useState({});

  const db = getFirestore(app);
  const alldata = [];

  const getProduct = async () => {
    const snap = await getDoc(doc(db, "product", `${id}`));

    if (snap.exists()) {
      console.log("data", snap.data());
      setProduct(snap.data());
    } else {
      console.log("No such document");
    }

    // const ref = doc(db, "product", { id });
    // const q = query(
    //   collection(db, "product"),
    //   where(firebase.firestore.FieldPath.documentId(), "==", `${id}`)
    // ).get();

    // const querySnapshot = await getDocs(q);
    // console.log("q", querySnapshot);

    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log("before", doc.id, " => ", doc.data());
    //   alldata.push({ id: doc.id, ...doc.data() });
    // });

    //console.log("prodct: ", alldata);
    //setProduct(alldata);
  };

  useEffect(() => {
    getProduct();
    // console.log("single roduct");
  }, []);

  return (
    <main className="bg-gray-50">
      <section className="w-5/6 m-auto">
        <Navbar />
        {/* <Hero /> */}

        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 border w-full lg:h-auto h-64 object-cover object-center rounded-lg"
                  src={products.pimage}
                />

                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      BRAND NAME
                    </h2>
                    <Link
                      className="bg-slate-700 rounded px-4 py-1 text-sm text-white"
                      to={"/"}
                    >
                      Go Back
                    </Link>
                  </div>

                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {products.productname}
                  </h1>
                  <div className="flex mb-4 mt-3">
                    <DynamicStar
                      rating={products.rating}
                      emptyStarColor="#cdcdcd"
                      fullStarColor="#00a8ff"
                      width={16}
                      height={16}
                    />
                  </div>
                  <p className="leading-relaxed">{products.detail}</p>
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    <div className="flex">
                      <span className="mr-3">Color</span>
                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${products.price}
                    </span>
                    <button className="flex ml-auto text-white duration-300 bg-blue-500 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      </section>
    </main>
  );
}
