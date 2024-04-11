import React from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";

export default function Navbar() {
  return (
    <div>
      <header className="flex items-center justify-between py-4 shadow-lg bg-slate-900 text-white">
        <div>
          <a href="/">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold sm:block ml-10">
                React Todo Application
              </div>
            </div>
          </a>
        </div>
      </header>

      <h3 className="text-center text-3xl text-gray-500 font-bold mt-10 mb-5">
        React Todo Application
      </h3>

      {/* <section className="listItem">
        <div className="check-bg" style={{ float: "left" }}>
          <div
            style={{ float: "left", marginRight: "10px", paddingTop: "10px" }}
          >
            <input id="cb1" type="checkbox" />
          </div>
          <p style={{ float: "left" }}>
            <span style={{ fontWeight: "bold", color: "gray" }}>
              Create a react project
            </span>{" "}
            <br />
            <span style={{ color: "gray" }}>05:36 AM, 02/04/2020</span>
          </p>
        </div>
        <div
          style={{
            float: "right",
            // backgroundColor: "red",
            paddingTop: "15px",
          }}
        >
          <MdDelete
            color="gray"
            style={{
              marginRight: "10px",
              cursor: "pointer",
              backgroundColor: "#dfe6e9",
              padding: "7px",
              borderRadius: "3px",
            }}
          />
          <BiSolidPencil
            color="gray"
            style={{
              marginRight: "10px",
              cursor: "pointer",
              backgroundColor: "#dfe6e9",
              padding: "7px",
              borderRadius: "3px",
            }}
          />
        </div>
      </section>
 */}
      {/* Second Item */}
    </div>
  );
}
