import { FaPen, FaFeather } from "react-icons/fa";
import { Link } from "react-router";
import BlogCard from "./BlogCard";
import { useBlogStore } from "/home/rupak/Blog app/client/src/store/useBlogStore.js";

const UserBlogsList = () => {
  const { authorBlogs } = useBlogStore();
  // console.log(authorBlogs);

  if (authorBlogs.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center py-16 px-8 max-w-lg mx-auto">
          {/* Animated Icon Container */}
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center shadow-lg">
              <FaFeather className="text-3xl text-blue-600 transform rotate-12" />
            </div>
            <FaFeather
              className="absolute -top-2 -right-2 text-yellow-400 text-sm animate-bounce"
              style={{ animationDelay: "0.5s" }}
            />
            <FaFeather
              className="absolute -bottom-1 -left-2 text-purple-400 text-xs animate-bounce"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Your Story Starts Here
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            Share your unique perspective with the world. Every great writer
            started with a single post.
          </p>

          {/* CTA Button */}
          <Link
            to="/write"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <FaPen className="text-sm" />
            <span>Write Your First Post</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Your Stories
            </h2>
            <p className="text-gray-600">
              {authorBlogs.length} {authorBlogs.length === 1 ? "post" : "posts"}{" "}
              published
            </p>
          </div>

          {/* Quick Action Button */}
          <Link
            to="/write"
            className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            <FaPen className="text-sm" />
            <span>New Post</span>
          </Link>
        </div>

        {/* Decorative line */}
        <div className="mt-6 h-px bg-gradient-to-r from-blue-200 via-purple-200 to-transparent"></div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {authorBlogs.map((blog, index) => (
          <div
            key={blog._id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>

      {/* Floating Action Button for Mobile */}
      <Link
        to="/write"
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50"
      >
        <FaPen className="text-lg" />
      </Link>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default UserBlogsList;