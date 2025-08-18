import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-10 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-3">
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Rentify Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Rentify
          </span>
        </Link>

        {/* Hamburger Icon (mobile only) */}
        <button
          className="md:hidden text-gray-900 dark:text-white text-2xl"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex font-medium space-x-8">
            <li>
              <Link
                to="/home"
                className={`py-2 px-3 rounded-md transition-all ${
                  location.pathname === "/home"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:text-blue-600 dark:text-white"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link
                to="/properties"
                className={`py-2 px-3 transition-all ${
                  location.pathname.includes("/properties")
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:text-blue-600 dark:text-white"
                }`}
              >
                Properties{" "}
                <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
              </Link>
              {/* Dropdown */}
              <div className="absolute hidden group-hover:block mt-2 w-40 rounded-md shadow-lg bg-gray-800 bg-white transition-all z-10">
                <ul className="rounded-md">
                  <li>
                    <Link
                      to="/properties?type=buy"
                      className="block px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors"
                    >
                      Buy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/properties?type=rent"
                       className="block px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors"
                    >
                      Rent
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link
                to="/about"
                className={`py-2 px-3 rounded-md transition-all ${
                  location.pathname === "/about"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:text-blue-600 dark:text-white"
                }`}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Dashboard/Login Button (desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <Link
              to={user.is_admin ? "/admin/dashboard" : "/user/profile"}
              className="flex items-center text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-all"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Dashboard
            </Link>
          ) : (
            <Link
              to="/users/login"
              className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <ul className="flex flex-col p-4 space-y-4 font-medium">
            <li>
              <Link to="/home" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/properties" onClick={toggleMenu}>
                Properties
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu}>
                About Us
              </Link>
            </li>
            <li>
              {user ? (
                <Link
                  to={user.is_admin ? "/admin/dashboard" : "/user/profile"}
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              ) : (
                <Link to="/users/login" onClick={toggleMenu}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
