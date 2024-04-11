import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "./Redux/Feature/todoSlice";

import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import Navbar from "./component/Navbar";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [inpValue, setInpValue] = useState("");
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todos);

  const handleKeyPress = async (event) => {
    event.preventDefault();
    console.log(inpValue);

    dispatch(addTodo(inpValue));
    setInpValue("");
    toast.success("Todo inserted successfully!", {
      style: {
        background: "#3498db",
        color: "white",
      },
    });
  };

  const deleteTodo = (id) => {
    console.log("id : ", id);
    dispatch(removeTodo(id));

    toast.success("Todo has been deleted!", {
      style: {
        background: "#e74c3c",
        color: "white",
      },
    });
  };

  return (
    <div className="bg-gray-50 h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main className="text-slate-600 w-4/5 m-auto">
        <h2 className="text-3xl text-center font-bold py-8">
          Todo Application
        </h2>

        <section>
          <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleKeyPress} className="items-center">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  onChange={(e) => setInpValue(e.target.value)}
                  value={inpValue}
                  className="block w-80 px-4 py-3 mb-5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please enter todo"
                  required
                />
              </div>
            </form>
          </div>
        </section>

        {allTodos.length == 0 ? (
          <h2 className="text-2xl text-center text-blue-500 font-semibold">
            No todos found
          </h2>
        ) : (
          <div className="border rounded-lg mx-5 mt-5 overflow-hidden shadow-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-slate-900 rounded-lg text-white">
                  <th scope="col" className="pl-5 w-16 py-3">
                    S #
                  </th>
                  <th scope="col" className="px-2 py-3">
                    TODO ID
                  </th>
                  <th scope="col" className="pl-5 w-60 py-3">
                    TODO TEXT
                  </th>
                  <th scope="col" className="pl-5 py-3">
                    CREATED AT
                  </th>
                  <th scope="col" className="w-24 pl-6 py-3">
                    DELETE
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTodos
                  ? allTodos.map((todo, ind) => {
                      return (
                        <tr
                          key={ind}
                          className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                        >
                          <td className="pl-5 py-3">{ind + 1}</td>

                          <td className="pl-5 text-gray-500">
                            {/* {prod.productname.substring(0, 35)}... */}
                            {todo.id}
                          </td>

                          <td className="pl-6 text-slate-800 font-semibold py-3">
                            {todo.text}
                          </td>

                          <td className="pl-6 text-slate-500 py-3">
                            {dayjs(todo.createdAt).format(
                              "DD MMM YYYY - hh.mm.ss A"
                            )}
                          </td>

                          <td className="pl-6 text-slate-800 font-semibold py-3 hover:cursor-pointer">
                            <MdDelete
                              size={"18px"}
                              onClick={() => {
                                deleteTodo(todo.id);
                              }}
                              color="#e74c3c"
                            />
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
