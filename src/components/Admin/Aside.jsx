import { IoGrid } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { useEffect } from "react";
function Aside() {
  useEffect(() => {
    const dash_list = document.querySelectorAll(".dash-list");

    dash_list.forEach((list) => {
      list.addEventListener("click", () => {
        dash_list.forEach((list) => {
          list.classList.remove("bg-list-hover");
          list.classList.remove("text-white");
        });
        list.classList.add("bg-list-hover");
        list.classList.add("text-white");
      });
    });
  }, []);

  return (
    <aside className="w-1/5 h-full">
      <div className="logo w-full text-2xl font-bold px-2 text-white">
        <h1>ShoppingTime</h1>
      </div>
      <nav className="w-full mt-8">
        <ul className="w-full text-dash-text font-semibold text-base">
          <li className="dash-list flex gap-2 items-center cursor-pointer py-3 px-2 rounded-md bg-list-hover text-white hover:bg-list-hover hover:text-white duration-200 ease-in-out">
            <span>
              <IoGrid />
            </span>
            <span>Dashbord</span>
          </li>
          <li className="dash-list flex gap-2 items-center cursor-pointer py-3 px-2 rounded-md hover:bg-list-hover hover:text-white duration-200 ease-in-out">
            <span>
              <FaShoppingBag />
            </span>
            <span>Orders</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Aside;
