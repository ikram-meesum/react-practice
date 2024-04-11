import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import SingleItem from "./SingleItem";
import SilkSlider from "../component/SilkSlider";

export default function Detail() {
  return (
    <section>
      <Navbar />
      <SilkSlider />

      <div className="flex mt-6">
        <div className="flex-none w-56 h-14 bg-slate-200">
          <Sidebar />
        </div>
        <div>
          <SingleItem />
        </div>
      </div>
    </section>
  );
}
