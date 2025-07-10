import { useBlogStore } from "../src/store/useBlogStore";
import BlogCard from "./BlogCard";
import Loader from "./Loader";

const BlogsContainer = () => {
  const { blogs, isGettingBlogs } = useBlogStore();

  if (isGettingBlogs) {
    return <Loader />;
  }

  return (
    <div className="my-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4 pb-2">
        All Blogs
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsContainer;