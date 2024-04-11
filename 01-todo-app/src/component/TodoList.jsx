import React, { useState } from "react";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "tippy.js/themes/translucent.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function TodoList() {
  const [allTodos, setAllTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [btnText, setBtnText] = useState("Add Todo");
  const [todoId, setTodoId] = useState("");
  const [combo, setCombo] = useState("");

  tippy("#del", {
    content: "Delete",
    animation: "scale",
    theme: "translucent",
  });

  const addTodo = (e) => {
    e.preventDefault();
    console.log(todoText);

    if (btnText === "Add Todo") {
      setAllTodos([
        ...allTodos,
        {
          id: nanoid(),
          todo: todoText,
          status: "Pending",
          createdAt: Date.now(),
        },
      ]);
      setTodoText("");
    }
    if (btnText === "Update") {
      const newState = allTodos.map((obj) => {
        // 👇️ if id equals 2, update country property
        if (obj.id === todoId) {
          return { ...obj, todo: todoText };
        }
        // 👇️ otherwise return the object as is
        return obj;
      });
      setAllTodos(newState);

      setBtnText("Add Todo");
      setTodoText("");
    }
  };
  console.log(allTodos);

  const deleteTodo = (id) => {
    console.log(id);

    Swal.fire({
      title: "Do you want to delete that todo?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setAllTodos((todo) => todo.filter((entry) => entry.id !== id));
        //Swal.fire("Saved!", "", "success");
        toast.success("Todo has been deleted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    });
  };

  const updateUser = (todo) => {
    console.log("edit: ", todo);
    setTodoText(todo.todo);
    console.log("todo:", todo);

    setTodoId(todo.id);
    setBtnText("Update");
  };

  const updateStatus = (todo) => {
    console.log("checked", todo);

    const newState = allTodos.map((obj) => {
      // 👇️ if id equals 2, update country property
      if (obj.id === todo.id) {
        return { ...obj, status: "Completed" };
      }
      // 👇️ otherwise return the object as is
      return obj;
    });
    setAllTodos(newState);
  };

  const comboSelect = (e) => {
    console.log("combo", e.target.value);

    if (e.target.value == "All Todos") {
      return;
    } else {
      const filtered = allTodos.filter((user) =>
        user.status.includes(e.target.value)
      );
      console.log("abc", filtered);
      setAllTodos(filtered);
    }

    // const newState = allTodos.map((obj) => {
    //   // 👇️ if id equals 2, update country property
    //   if (obj.status === e.target.value) {
    //     return { ...obj };
    //   }
    //   // 👇️ otherwise return the object as is
    //   return obj;
    // });
    // setAllTodos(newState);
    // console.log("abc", allTodos);
  };

  // =============== SEARCH CODE ===============
  const [filter, setFilter] = useState("");
  const lowercasedFilter = filter.toLowerCase();

  const filteredData = allTodos.filter((item) => {
    if (
      (item["status"] &&
        item["status"].toLowerCase().includes(lowercasedFilter)) ||
      (item["todo"] && item["todo"].toLowerCase().includes(lowercasedFilter))
    ) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <main className="mx-16">
      {/* dropdown list */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search any..."
          value={filter}
          className="p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <form className="mb-7" onSubmit={addTodo}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
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
            type="search"
            id="default-search"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Enter todos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 "
          >
            {btnText}
          </button>
        </div>
      </form>

      {/* Show Todos */}

      <div className="border rounded-lg overflow-hidden shadow-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-slate-900 rounded-lg text-white">
              <th scope="col" className="px-6 py-3">
                S #
              </th>
              <th scope="col" className="px-6 py-3">
                Todo ID
              </th>
              <th scope="col" className="px-6 py-3">
                Todo Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((todo, ind) => {
              return (
                <tr
                  key={ind}
                  className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                >
                  <td className="px-6 py-3">{ind + 1}</td>
                  <td className="px-6 py-3">{todo.id}</td>
                  <td className="px-6 py-3  font-medium text-gray-900">
                    {todo.todo}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      onClick={() => updateStatus(todo)}
                      className={
                        todo.status == "Pending"
                          ? "bg-green-200 text-black p-1 rounded text-sm hover:cursor-pointer"
                          : "bg-red-200 text-black p-1 rounded text-sm hover:cursor-pointer"
                      }
                    >
                      {todo.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {dayjs(todo.createdAt).format("DD-MMM-YYYY - hh:mm a")}
                  </td>
                  <td className="px-6 py-3 font-normal">
                    <div className="flex mr-4">
                      <div>
                        <MdDelete
                          id="del"
                          size={20}
                          className="mr-5 hover:cursor-pointer"
                          color="blue"
                          onClick={() => deleteTodo(todo.id)}
                        />
                      </div>
                      <div>
                        <FaRegEdit
                          size={18}
                          color="green"
                          className="hover:cursor-pointer"
                          onClick={() => updateUser(todo)}
                        />
                      </div>
                    </div>
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
