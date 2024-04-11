import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
// import { FaLaptop } from "react-icons/fa";
// import { MdSmartphone } from "react-icons/md";
// import { FaBottleDroplet } from "react-icons/fa6";
// import { FaFemale } from "react-icons/fa";
// import { LuShoppingBasket } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { app } from "./connection";
import { collection, getDocs, getFirestore } from "firebase/firestore";

function Sidebar() {
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();

  const db = getFirestore(app);
  const response = [];

  const getCategory = async () => {
    // setAllCategory(null);
    const querySnapshot = await getDocs(collection(db, "categories"));
    querySnapshot.forEach((doc) => {
      response.push({ id: doc.id, ...doc.data() });
    });
    setAllCategory(response);
    console.log("state: ", allCategory);
  };

  useEffect(() => {
    setIsLoading(true);
    getCategory();
    setIsLoading(false);
  }, []);

  return (
    <section className="">
      <aside className="z-40">
        <div className="px-3 py-3 overflow-y-auto scrollbar-thin scrollbar-webkit">
          <h2 className="text-red-500 uppercase text-lg mb-5 ml-5 font-bold">
            <Link to={"/"}>All Categories</Link>
          </h2>
          <ul className="space-y-1 font-medium">
            {allCategory.length > 0 &&
              allCategory.map((res, ind) => (
                <li
                  key={ind}
                  className={
                    location.pathname == `/category/${res.id}`
                      ? "bg-gray-200 rounded-lg"
                      : ""
                  }
                >
                  <Link
                    to={`/category/${res.id}`}
                    className={`flex items-center p-1 text-gray-900 rounded-md hover:bg-gray-50`}
                  >
                    &raquo;
                    <span className="flex-1 ms-3 text-sm uppercase whitespace-nowrap">
                      {res.catname}
                      {/* {category[0].toUpperCase() +
                          category.substring(1, category.length).toLowerCase()} */}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}

export default Sidebar;
