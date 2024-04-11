import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import frontend from "./component/frontend.png";
import backend from "./component/images/backend.jpg";
import "./App.css";

function App() {
  const [changeImage, setChangeImage] = useState(true);

  const flipImage = () => {
    console.log("change image");
  };

  return (
    <>
      <h1>Flip Image in React</h1>
      <img src={changeImage ? frontend : backend} height={250} width={550} />
      <br />
      <br />

      <button onClick={() => setChangeImage((changeImage) => !changeImage)}>
        Change Image
      </button>
    </>
  );
}

export default App;
