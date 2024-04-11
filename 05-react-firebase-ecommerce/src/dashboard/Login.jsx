import React from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
// import { getDatabase } from "firebase/database";
// import { auth } from "../component/connection";
import { useNavigate } from "react-router-dom";
import { app } from "../component/connection";

import {
  collection,
  getFirestore,
  where,
  query,
  getDocs,
} from "firebase/firestore";

// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  let abc = import.meta.env.VITE_REACT_APP_ACCESS_KEY;
  console.log(abc);

  const navigate = useNavigate();

  const db = getFirestore(app);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = query(
      collection(db, "appuser"),
      where("email", "==", data.email),
      where("password", "==", data.password)
    );
    let id = "";
    const querySnapshot = await getDocs(res);
    querySnapshot.forEach((doc) => {
      console.log("res", doc.id, " => ", doc.data());
      console.log("id", doc.id);
      id = doc.id;
      sessionStorage.setItem("userinfo", JSON.stringify(doc.data()));
    });
    if (id == "") {
      toast.error("Invalid user credential. Please try again");
    } else {
      toast.success("Login Successfully!");
      setTimeout(() => {
        navigate("/dashboard/allproduct");
      }, 3000);
    }
  };

  // const googleProvider = new GoogleAuthProvider();

  // const signInGoogle = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       const user = result.user;
  //       console.log("user name: ", user.email);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       const email = error.customData.email;
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //     });
  // };

  return (
    <section className="bg-gray-50 h-screen">
      <Navbar />
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            // border: "1px solid #713200",
            // padding: "16px",
            color: "black",
            backgroundColor: "#b8e994",
          },
        }}
      />
      <br />
      <h3 className="text-2xl mb-5 mt-5 text-slate-800 font-semibold text-center">
        User Credential
      </h3>

      {/* start alert */}
      <div
        className="flex items-center p-4 mt-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-2/5 m-auto"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Important Message!</span> Please login
          to access this application.
        </div>
      </div>
      {/* end alert */}
      <br />

      <form className="w-2/5 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Valid email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500">Email is required.</p>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Type your secure code"
            {...register("password", { minLength: 6, required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* {errors.password.minLength < 6 && (
            <p className="text-red-500">Minimum 6 character.</p>
          )} */}
          {errors.password && (
            <p className="text-red-500">Password length minimum 6 character.</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium mb-2 rounded-md text-sm px-8 py-2 text-center  "
        >
          LOGIN
        </button>
      </form>
    </section>
  );
}
