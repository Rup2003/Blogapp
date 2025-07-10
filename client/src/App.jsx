import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";

import RootLayout from "./layouts/RootLayout";
import Loader from "../components/Loader";
import AnimatedBackground from "../components/AnimatedBackground"; // Add this import
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import { useAuthstores } from "./store/useAuthstores";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { BlogsPage } from "./pages/BlogPage";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {getProfile} = useAuthstores();

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 3500);
    getProfile();
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/blog/:id" element={<h1>Blog Preview</h1>} />
          <Route path="/blog/create" element={<h1>Blog Creation</h1>} />
           <Route path="/blogs" element={<ProtectedRoutes> <BlogsPage /> </ProtectedRoutes>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
};