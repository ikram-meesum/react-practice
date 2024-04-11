import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCdYZE24rtwOrU0UdlTeyBJKjqM-qQhT0o",
  authDomain: "ecommerce-1bbb1.firebaseapp.com",
  projectId: "ecommerce-1bbb1",
  storageBucket: "ecommerce-1bbb1.appspot.com",
  messagingSenderId: "417673250672",
  appId: "1:417673250672:web:034d36ba1e781850ea31b5",
  databaseURL: "https://ecommerce-1bbb1-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
