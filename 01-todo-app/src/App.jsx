// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Navbar from "./component/Navbar.jsx";
import TodoList from "./component/TodoList.jsx";

function App() {
  return (
    <main className="bg-gray-50 h-screen">
      <Navbar />
      <TodoList />
    </main>
  );
}

export default App;
