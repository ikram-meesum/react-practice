import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
// import LoadingBar from "react-top-loading-bar";
// import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { DynamicStar } from "react-dynamic-star";

import SilkSlider from "./component/SilkSlider";
import Sidebar from "./component/Sidebar";
import Content from "./component/Content";

function App() {
  return (
    <section className="">
      <Navbar />
      <SilkSlider />

      <div className="flex">
        <div className="flex-none w-56 h-screen">
          <Sidebar />
        </div>

        <div className="flex-initial w-full p-4">
          <Content />
        </div>
      </div>
      <br />
      <br />
      <br />
    </section>
  );
}

export default App;
