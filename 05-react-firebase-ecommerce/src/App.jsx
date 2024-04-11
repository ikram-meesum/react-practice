import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import ReactLoading from "react-loading";
import { DynamicStar } from "react-dynamic-star";

import SilkSlider from "./component/SilkSlider";
// import Sidebar from "./component/Sidebar";
import Content from "./component/Content";
import Hero from "./component/Hero";

function App() {
  return (
    <main className="bg-gray-50">
      <section className="w-5/6 m-auto">
        <Navbar />
        <Hero />
        <div>
          <Content />
        </div>

        <br />
        <br />
        <br />
      </section>
    </main>
  );
}

export default App;
