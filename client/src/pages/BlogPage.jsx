import { Link } from "react-router";
import { useBlogStore } from "../store/useBlogStore";
import { useEffect } from "react";
import BlogsContainer from "../../components/Blogcontainer";
import { FaChevronLeft } from "react-icons/fa";

export const BlogsPage = () => {
  const { getBlogs } = useBlogStore();

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all shadow-sm">
            <FaChevronLeft />
            <span className="text-sm">Back</span>
          </button>
        </Link>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition-all">
          Create Blog
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md">
        <BlogsContainer />
      </div>
    </div>
  );
};
