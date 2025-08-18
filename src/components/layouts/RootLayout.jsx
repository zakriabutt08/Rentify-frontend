import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const RootLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Paths where navbar/footer should be hidden
  const hideLayout = location.pathname.startsWith("/admin") || location.pathname.startsWith("/user");

  return (
    <>
      {!hideLayout && <Navbar user={user} />}
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
      {!hideLayout && <Footer />}
      <Toaster containerClassName="adjust-hot-toast" />
    </>
  );
};

export default RootLayout;
