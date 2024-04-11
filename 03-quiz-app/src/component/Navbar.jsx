import React from "react";
// import "../App.css";

export default function TopButton() {
  return (
    <div className="">
      <header className="flex items-center justify-between py-4 shadow-lg bg-slate-900 text-white">
        <div>
          <a href="/">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold sm:block ml-10">
                React Quiz Application
              </div>
            </div>
          </a>
        </div>
      </header>

      <h3 className="text-center text-3xl text-gray-500 font-bold mt-10 mb-5">
        Quiz Application using Rest Api
      </h3>
    </div>
  );
}
