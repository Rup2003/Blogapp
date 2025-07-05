import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import { useAuthstores } from '../src/store/useAuthstores';
import { FaUser, FaSignOutAlt, FaPen, FaBars, FaTimes } from "react-icons/fa";

export const Navbar = () => {

   const { authUser, logoutUser } = useAuthstores();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
  {/* Main Navbar - Enlarged */}
  <header
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-purple-900/90 backdrop-blur-lg border-b border-purple-800/40 shadow-xl"
        : "bg-transparent"
    }`}
  >
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      {/* Logo - Larger */}
      <Link
        to="/"
        className="flex items-center hover:opacity-80 transition-opacity"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
          Wryta
        </h1>
      </Link>

      {/* Desktop Navigation - Spaced Out */}
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex items-center gap-8">
          <Link
            to="/story"
            className="text-purple-100 hover:text-white font-medium transition-colors text-[15px] uppercase tracking-wider px-1 py-1"
          >
            Our Story
          </Link>
          <Link
            to="/write"
            className="flex items-center gap-2 text-purple-100 hover:text-white font-medium transition-colors text-[15px] uppercase tracking-wider px-1 py-1"
          >
            <FaPen className="text-sm" />
            Write
          </Link>
        </nav>

        {/* Auth Section - Larger */}
        {authUser ? (
          <div className="flex items-center gap-5 ml-6">
            <Link
              to="/write"
              className="hidden lg:flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full text-[15px] font-medium hover:opacity-90 transition-opacity shadow-xl hover:shadow-violet-500/40"
            >
              <FaPen className="text-sm" />
              New Story
            </Link>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="cursor-pointer">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-purple-200/40 shadow-md hover:border-violet-400 transition-colors">
                  <img
                    src={authUser.avatar.url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-purple-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-purple-800/40 w-56 p-3 mt-3"
              >
                <li className="px-4 py-3 border-b border-purple-800/40">
                  <div className="text-[15px]">
                    <div className="font-semibold text-white">
                      {authUser.firstname} {authUser.lastname}
                    </div>
                    <div className="text-purple-300 text-xs mt-1">
                      @{authUser.username}
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 text-purple-100 hover:bg-purple-800/60 rounded-lg px-4 py-3 text-[15px] transition-colors"
                  >
                    <FaUser className="text-sm" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/write"
                    className="flex items-center gap-3 text-purple-100 hover:bg-purple-800/60 rounded-lg px-4 py-3 text-[15px] transition-colors"
                  >
                    <FaPen className="text-sm" />
                    Write Story
                  </Link>
                </li>
                <li className="pt-2 border-t border-purple-800/40">
                  <button
                    onClick={logoutUser}
                    className="flex items-center gap-3 text-rose-400 hover:bg-purple-800/60 rounded-lg px-4 py-3 w-full text-left text-[15px] transition-colors"
                  >
                    <FaSignOutAlt className="text-sm" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-purple-100 hover:text-white font-medium transition-colors text-[15px] px-1 py-1"
            >
              Sign In
            </Link>
            <Link to="/register">
              <button className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-5 py-3 rounded-full hover:opacity-90 transition-opacity text-[15px] font-medium shadow-xl hover:shadow-violet-500/40">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button - Larger */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-purple-100 hover:text-white transition-colors p-2.5"
      >
        {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>
    </div>
  </header>

  {/* Mobile Menu - Enhanced */}
  {isMobileMenuOpen && (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-purple-900/90 backdrop-blur-lg"
        onClick={toggleMobileMenu}
      />

      {/* Menu Content - Larger */}
      <div className="fixed top-20 right-5 bg-purple-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-purple-800/40 w-80 animate-fade-in">
        <div className="p-5 space-y-5">
          <Link
            to="/story"
            className="block text-purple-100 hover:text-white hover:bg-purple-800/60 font-medium transition-colors text-[15px] py-3 px-4 rounded-lg"
            onClick={toggleMobileMenu}
          >
            Our Story
          </Link>
          <Link
            to="/write"
            className="flex items-center gap-3 text-purple-100 hover:text-white hover:bg-purple-800/60 font-medium transition-colors text-[15px] py-3 px-4 rounded-lg"
            onClick={toggleMobileMenu}
          >
            <FaPen className="text-sm" />
            Write
          </Link>

          {authUser ? (
            <div className="pt-5 border-t border-purple-800/40 space-y-5">
              <div className="flex items-center gap-4 px-4 py-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-700">
                  <img
                    src={authUser.avatar.url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-[15px]">
                    {authUser.firstname} {authUser.lastname}
                  </div>
                  <div className="text-xs text-purple-300 mt-1">
                    @{authUser.username}
                  </div>
                </div>
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-3 text-purple-100 hover:text-white hover:bg-purple-800/60 text-[15px] py-3 px-4 rounded-lg transition-colors"
                onClick={toggleMobileMenu}
              >
                <FaUser className="text-sm" />
                Profile
              </Link>
              <Link
                to="/write"
                className="flex items-center gap-3 text-purple-100 hover:text-white hover:bg-purple-800/60 text-[15px] py-3 px-4 rounded-lg transition-colors"
                onClick={toggleMobileMenu}
              >
                <FaPen className="text-sm" />
                New Story
              </Link>
              <button
                onClick={() => {
                  logoutUser();
                  toggleMobileMenu();
                }}
                className="flex items-center gap-3 text-rose-400 hover:text-rose-300 hover:bg-purple-800/60 text-[15px] py-3 px-4 rounded-lg w-full text-left transition-colors"
              >
                <FaSignOutAlt className="text-sm" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-5 border-t border-purple-800/40 space-y-4">
              <Link
                to="/login"
                className="block text-center text-purple-100 hover:text-white hover:bg-purple-800/60 font-medium text-[15px] py-3 px-4 rounded-lg transition-colors"
                onClick={toggleMobileMenu}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block"
                onClick={toggleMobileMenu}
              >
                <button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3.5 rounded-full hover:opacity-90 transition-opacity text-[15px] font-medium shadow-xl hover:shadow-violet-500/40">
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )}
</>
  )
}
