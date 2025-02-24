import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FaUser, FaHome, FaCog, FaDollarSign, FaFileInvoice, FaChartBar, FaBookOpen } from 'react-icons/fa';

const UserLayout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  const sideNavLinks = [
    { children: "Profile", to: "/user/profile", icon: <FaUser /> },
  ];

  if (user.is_admin) {
    sideNavLinks.unshift({ children: "Dashboard", to: "/admin/dashboard", icon: <FaChartBar /> });
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
      <aside className="w-72 min-w-72 bg-white shadow-2xl p-6 flex flex-col transition-all duration-300 ease-in-out">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
          {user.is_admin ? "Admin Panel" : "My Dashboard"}
        </h2>
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
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                <span className={`text-lg ${isActive ? "text-white" : "text-gray-500"}`}>
                  {linkProps.icon}
                </span>
                <span className="text-base font-medium">{linkProps.children}</span>
              </Link>
            );
          })}
        </nav>
        {/* Footer (Optional) */}
        <div className="mt-auto text-sm text-gray-500">
          <p>© 2025 Property Management</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default UserLayout;