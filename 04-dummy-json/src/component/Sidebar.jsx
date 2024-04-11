import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { FaLaptop } from "react-icons/fa";
import { MdSmartphone } from "react-icons/md";
import { FaBottleDroplet } from "react-icons/fa6";
import { FaFemale } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    // fetch("https://dummyjson.com/products/categories")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log("category: ", json);
    //     setAllCategory(json);
    //     setIsLoading(false);
    //  });
  }, []);

  return (
    <section className="">
      <aside className="z-40 h-screen w-56 mt-7">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 scrollbar-thin scrollbar-webkit">
          <ul className="space-y-2 font-medium">
            <li
              className={
                location.pathname == "/category/smartphones"
                  ? "bg-gray-200 rounded-lg"
                  : ""
              }
            >
              <Link
                to={`/category/smartphones`}
                // href="#"
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100`}
              >
                <MdSmartphone />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Smartphone
                  {/* {category[0].toUpperCase() +
                          category.substring(1, category.length).toLowerCase()} */}
                </span>
              </Link>
            </li>
            {/* second  */}

            <li
              className={
                location.pathname == "/category/laptops"
                  ? "bg-gray-200 rounded-lg"
                  : ""
              }
            >
              <Link
                to={`/category/laptops`}
                // href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaLaptop />
                <span className="flex-1 ms-3 whitespace-nowrap">Laptops</span>
              </Link>
            </li>
            {/* third */}

            <li
              className={
                location.pathname == "/category/fragrances"
                  ? "bg-gray-200 rounded-lg"
                  : ""
              }
            >
              <Link
                to={`/category/fragrances`}
                // href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaBottleDroplet />
                <span className="flex-1 ms-3 whitespace-nowrap">Fragrance</span>
              </Link>
            </li>
            {/* forth */}

            <li
              className={
                location.pathname == "/category/skincare"
                  ? "bg-gray-200 rounded-lg"
                  : ""
              }
            >
              <Link
                to={`/category/skincare`}
                // href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <FaFemale />
                <span className="flex-1 ms-3 whitespace-nowrap">Skincare</span>
              </Link>
            </li>

            {/* five */}

            <li
              className={
                location.pathname == "/category/groceries"
                  ? "bg-gray-200 rounded-lg"
                  : ""
              }
            >
              <Link
                to={{ pathname: `/category/groceries` }}
                relative="path"
                // state={catname}
                // href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <LuShoppingBasket />
                <span className="flex-1 ms-3 whitespace-nowrap">Groceries</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

export default Sidebar;
