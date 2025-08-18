import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import {
  FaUser,
  FaHome,
  FaCog,
  FaDollarSign,
  FaFileInvoice,
  FaChartBar,
  FaBookOpen,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const UserLayout = ({ children }) => {
  const location = useLocation();
  const { user, signOutUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sideNavLinks = [
    { children: "Profile", to: "/user/profile", icon: <FaUser /> },
  ];

  if (user.is_admin) {
    sideNavLinks.unshift({
      children: "Dashboard",
      to: "/admin/dashboard",
      icon: <FaChartBar />,
    });
    sideNavLinks.push(
      { children: "Properties", to: "/admin/properties", icon: <FaHome /> },
      { children: "Agreements", to: "/admin/agreements", icon: <FaFileInvoice /> },
      { children: "Customers", to: "/admin/customers", icon: <FaUser /> },
      { children: "Accounts", to: "/admin/accounts", icon: <FaBookOpen /> }
    );
  } else {
    sideNavLinks.push(
      { children: "Agreements", to: "/user/agreements", icon: <FaFileInvoice /> },
      { children: "Payments", to: "/user/payments", icon: <FaDollarSign /> },
      { children: "Utility Bills", to: "/user/utility-bills", icon: <FaCog /> }
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-2xl p-6 flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-72" : "w-20"}
        `}
      >
        {/* Logo + Toggle Button */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/home"
            className={`flex items-center hover:opacity-80 transition ${!isSidebarOpen ? "mx-auto" : ""}`}
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Rentify Logo"
              className="h-10"
            />
            {isSidebarOpen && (
              <span className="ml-3 text-xl font-bold text-gray-900">
                Rentify
              </span>
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className={`p-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition ${
              !isSidebarOpen ? "mx-auto" : ""
            }`}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Header */}
        {/* {isSidebarOpen && (
          <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
            {user.is_admin ? "Admin Panel" : "My Dashboard"}
          </h2>
        )} */}

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {sideNavLinks.map((linkProps, i) => {
            const isActive = location.pathname.includes(
              linkProps.children.split(" ").join("-").toLowerCase()
            );
            return (
              <Link
                key={i}
                to={linkProps.to}
                className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                <span
                  className={`text-lg ${
                    isActive ? "text-white" : "text-gray-500"
                  } ${!isSidebarOpen ? "mx-auto" : ""}`}
                >
                  {linkProps.icon}
                </span>
                {isSidebarOpen && (
                  <span className="text-base font-medium">
                    {linkProps.children}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={signOutUser}
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-800 transition-all duration-200 ease-in-out transform hover:scale-105 mt-4 ${
            !isSidebarOpen ? "justify-center" : ""
          }`}
        >
          <span className={`text-lg ${!isSidebarOpen ? "mx-auto" : ""}`}>
            <FaSignOutAlt />
          </span>
          {isSidebarOpen && (
            <span className="text-base font-medium">Logout</span>
          )}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow relative">
        <div className="bg-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl p-6 md:p-8 lg:p-10 rounded-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
