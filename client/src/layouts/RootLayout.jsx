import { Outlet } from "react-router";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const RootLayout = () => {
  return (
    <div className="relative h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;