import { Link } from "react-router-dom";
import { Search } from "./Search.jsx";
const Navbar = ({ darkTheme, setDarkTheme }) => {
  return (
    <div
      className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b
     dark:border-gray-700 border-gray-300"
    >
      <div className="flex justify-between items-center space-x-5 w-screen">
        <Link>
          <p
            className="text-2xl bg-green-600 font-bold text-white
         py-1 px-2 cursor-pointer rounded dark:bg-gray-300 dark:text-gray-800 "
          >
            Google 🔍{" "}
          </p>
        </Link>

        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg"
        >
          {darkTheme ? "light ⛅" : "dark 🌙"}
        </button>
      </div>
      <Search />
    </div>
  );
};

export default Navbar;
