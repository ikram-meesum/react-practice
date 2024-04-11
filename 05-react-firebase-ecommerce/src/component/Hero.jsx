import React from "react";
import SilkSlider from "./SilkSlider";
import Sidebar from "./Sidebar";

export default function Hero() {
  return (
    <section className="flex">
      <div className="w-1/4 border rounded-lg mr-2">
        <Sidebar />
      </div>
      <div className="w-3/4 rounded-md">
        <SilkSlider />
      </div>
    </section>
  );
}
