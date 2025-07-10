import { FaRegClock, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.coverImage.url || "https://placehold.co/600x400"}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 truncate">
          {blog.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Date */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FaRegClock className="text-blue-500" />
            <span className="font-medium">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Read More Link */}
          <Link
            to={`/blog/${blog._id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 group/link"
          >
            <span>Read more</span>
            <FaArrowRight className="text-xs transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};

export default BlogCard;