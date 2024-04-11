import React from "react";

export default function Navbar() {
  return (
    <div className="text-white bg-slate-900 shadow-lg">
      <header className="flex items-center justify-between py-4 text-slate-800">
        <div>
          <a href="/">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold sm:block">
                <span className="text-slate-200 ml-8">
                  Redux Toolkit Todo App
                </span>
              </div>
            </div>
          </a>
        </div>
      </header>
    </div>
  );
}
