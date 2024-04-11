import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { app } from "../component/connection";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import Navbar from "./Navbar";
import dayjs from "dayjs";

export default function AddCategory() {
  const [allCategory, setAllCategory] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset(),
  } = useForm();

  const db = getFirestore(app);

  const response = [];

  const getCategory = async () => {
    // setAllCategory(null);
    const querySnapshot = await getDocs(collection(db, "categories"));
    querySnapshot.forEach((doc) => {
      response.push({ id: doc.id, ...doc.data() });
    });
    setAllCategory(response);
    console.log("line 37: ", response);
    console.log("all cat: ", allCategory);
  };

  useEffect(() => {
    // setIsLoading(true);
    getCategory();
    // setIsLoading(false);
  }, []);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const result = await addDoc(collection(db, "categories"), {
        catname: data.catname,
        // ricon: data.ricon,
        createdAt: Date.now(),
      });
      console.log("res", result.id);
    } catch (err) {
      console.log("Error occured from add category method: ", err);
    }
  };

  return (
    <>
      <Navbar />
      <section className="">
        <h2 className="text-center text-3xl font-bold uppercase text-slate-900 my-10">
          All Categories
        </h2>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <main className="flex justify-center w-3/5 m-auto">
            <div className="flex justify-between">
              <label
                htmlFor=""
                className="w-40 mr-1 pt-2 text-right text-sm font-medium text-gray-900"
              >
                New Category :
              </label>
              <input
                type="text"
                {...register("catname", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                placeholder="Add new category"
              />
              <br />
              <div>
                {errors.catname && (
                  <p className="text-red-500">Category name is required.</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="text-white ml-2 uppercase bg-blue-500 duration-300 hover:bg-blue-600 py-2 px-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm text-center"
            >
              add new
            </button>
          </main>
        </form>

        {/* Display data */}
        <div className="border rounded-lg w-4/5 mx-auto mt-10 overflow-hidden shadow-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-slate-900 rounded-lg text-white">
                <th scope="col" className="px-6 py-3">
                  S #
                </th>
                <th scope="col" className="px-6 py-3">
                  CATEGORY ID
                </th>
                <th scope="col" className="px-6 py-3">
                  CATEGORY NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  CREATED AT
                </th>
              </tr>
            </thead>
            <tbody>
              {allCategory.map((cat, ind) => {
                return (
                  <tr
                    key={ind}
                    className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                  >
                    <td className="px-6 py-3">{ind + 1}</td>
                    <td className="px-6 py-3">{cat.id}</td>
                    <td className="px-6 py-3  font-medium text-gray-900">
                      {cat.catname}
                    </td>

                    <td className="px-6 py-3">
                      {dayjs(cat.createdAt).format("DD-MMM-YYYY - hh:mm a")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
