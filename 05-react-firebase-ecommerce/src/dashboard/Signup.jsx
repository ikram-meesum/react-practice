import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// import toast, { Toaster } from "react-hot-toast";

import { app } from "../component/connection";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default function Signup() {
  const [pImage, setPImage] = useState("");
  const [rain, setRain] = useState(false);
  const navigate = useNavigate();

  const imgDB = getStorage(app);
  const db = getFirestore(app);
  // const auth = getAuth(app);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    addUser(data);
    setRain(true);
    reset();

    // try {
    //   createUserWithEmailAndPassword(auth, data.email, data.password)
    //     .then((userCredential) => {
    //       const user = userCredential.user;
    //       console.log("user", user);
    //       // console.log("email: ", user.auth.email);
    //       toast.success("Signup Successfully!");
    //     })
    //     .catch((error) => {
    //       console.log(error.code);
    //       console.log(error.message);
    //       alert(error.message);
    //     });
    // } catch (err) {
    //   console.log("Error occured from add user method: ", err);
    // }
    // }
  };

  const addUser = async (data) => {
    // console.log("line 49: ", data);
    try {
      const result = await addDoc(collection(db, "appuser"), {
        email: data.email,
        fullname: data.fullname,
        password: data.password,
        profession: data.profession,
        pimage: pImage,
        createdAt: Date.now(),
      });

      console.log("user added: ", result.id);
      sessionStorage.setItem("fullname", data.fullname);
      sessionStorage.setItem("profession", data.profession);
      sessionStorage.setItem("image", pImage);
      reset();
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    } catch (err) {
      console.log("Error occured from adduser method: ", err);
      alert("Error from adduser: " + err);
    }
  };

  const imageUpload = (e) => {
    console.log("img upload", e.target.files[0]);
    const imgs = ref(imgDB, `${nanoid()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "img");
      getDownloadURL(data.ref).then((value) => {
        console.log(value);
        setPImage(value);
      });
    });
  };

  return (
    <main className="bg-gray-50">
      <div className="">
        <Navbar />
      </div>

      {rain && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <section className="flex">
        <div className="w-1/2 mx-auto">
          {/* start alert */}
          <div
            className="flex items-center p-4 mt-24 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-full m-auto"
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
              <span className="font-medium">Important Message!</span>&nbsp; All
              fields are require and password will be atleast 6 characters.
            </div>
          </div>

          {/* end alert */}

          <form
            className="lg:col-span-2 mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3">
                <label>Full Name</label>
                <input
                  type="text"
                  {...register("fullname", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Enter full name"
                />
                {errors.fullname && (
                  <p className="text-red-500">Full name is required.</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label>Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Valid email"
                />
                {errors.email && (
                  <p className="text-red-500">Valid email is required.</p>
                )}
              </div>

              <div className="md:col-span-3">
                <label>Your Profession</label>
                <input
                  type="text"
                  {...register("profession", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Type your profession"
                />
                {errors.profession && (
                  <p className="text-red-500">Profession is required.</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label>Password</label>
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Type secure code"
                />
                {errors.password && (
                  <p className="text-red-500">
                    Password is atleast 6 characters.
                  </p>
                )}
              </div>

              <div className="md:col-span-5">
                <label>Your Photo</label>
                <input
                  className="block w-full text-sm border-gray-300 cursor-pointer bg-gray-50 focus:outline-none "
                  type="file"
                  onChange={(e) => imageUpload(e)}
                />
                <div className="mt-1 text-sm text-gray-500">
                  Your picture will be display on front page.
                </div>
              </div>

              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button
                    disabled={!pImage}
                    className={
                      !pImage
                        ? "bg-gray-200 text-slate-400 font-bold py-2 px-6 rounded"
                        : `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`
                    }
                  >
                    SIGNUP
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* end form */}
          <div className="mb-28"></div>
        </div>
      </section>
    </main>
  );
}
