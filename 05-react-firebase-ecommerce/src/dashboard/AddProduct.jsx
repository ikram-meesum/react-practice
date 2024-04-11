import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { app } from "../component/connection";
import { useForm } from "react-hook-form";
import { collection, getDocs, getFirestore, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";
console.log("nano ", nanoid());

export default function AddProduct() {
  const [allCategory, setAllCategory] = useState([]);
  const [pImage, setPImage] = useState("");

  const imgDB = getStorage(app);
  const db = getFirestore(app);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getCategory();
  }, []);

  const response = [];

  const getCategory = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    querySnapshot.forEach((doc) => {
      response.push({ id: doc.id, ...doc.data() });
    });
    setAllCategory(response);
    console.log("state: ", allCategory);
  };

  const storage = getStorage();

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

  const onSubmit = async (data) => {
    console.log("p image", pImage);
    console.log(data);

    try {
      const result = await addDoc(collection(db, "product"), {
        productname: data.productname,
        price: data.price,
        detail: data.detail,
        rating: data.rating,
        catId: data.category,
        pimage: pImage,
        createdAt: Date.now(),
      });
      console.log("res", result.id);
      reset();
    } catch (err) {
      console.log("Error occured from add category method: ", err);
    }
  };

  return (
    <section>
      <Navbar />
      <h2 className="text-2xl font-bold text-center mt-6 text-slate-800 mb-2">
        Please enter products details
      </h2>

      {/* form start */}

      <div className="p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Enter Product Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <form
                  className="lg:col-span-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-3">
                      <label>Product Full Name</label>
                      <input
                        type="text"
                        {...register("productname", { required: true })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Enter new product"
                      />
                      {errors.productname && (
                        <p className="text-red-500">
                          Product name is required.
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label>Product Price</label>
                      <input
                        type="text"
                        {...register("price", { required: true })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Product Price"
                      />
                      {errors.price && (
                        <p className="text-red-500">Price is required.</p>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <label>Product Details</label>
                      <input
                        type="text"
                        {...register("detail", { required: true })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Product details"
                      />
                      {errors.detail && (
                        <p className="text-red-500">
                          Product details is required.
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label>Rating</label>
                      <input
                        type="text"
                        {...register("rating", { required: true })}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Enter Rating"
                      />
                      {errors.rating && (
                        <p className="text-red-500">Rating is required.</p>
                      )}
                    </div>

                    <div className="md:col-span-3">
                      <label>Select Category</label>

                      <select
                        {...register("category", { required: true })}
                        className="bg-gray-50 border border-gray-300 mt-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      >
                        {/* <option selected>Choose a country</option> */}
                        {allCategory.length > 0 &&
                          allCategory.map((cat, ind) => {
                            return (
                              <option key={ind} value={cat.id}>
                                {cat.catname}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="md:col-span-5">
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Upload file
                      </label>
                      <input
                        className="block w-full text-sm border-gray-300 cursor-pointer bg-gray-50 focus:outline-none "
                        type="file"
                        onChange={(e) => imageUpload(e)}
                      />

                      <div className="mt-1 text-sm text-gray-500">
                        A product picture will be display on front page.
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
                          Insert Product
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* form end */}
    </section>
  );
}
