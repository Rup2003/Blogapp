import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../api/axios";

export const useBlogStore = create((set) => ({
  blogs: [],
  authorBlogs: [],
  blog: null,
  isGettingBlogs: false,
  isGettingAuthorBlogs: false,
  isGettingBlog: false,

  getAuthorBlogs: async () => {
    set({ isGettingAuthorBlogs: true });
    try {
      const res = await axiosInstance.get(`/blog/author`);
      console.log(res.data.data);
      set({ authorBlogs: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isGettingAuthorBlogs: false });
    }
  },

  getBlogById: async (id) => {
    set({ isGettingBlog: true });
    try {
      const res = await axiosInstance.get(`/blog/${id}`);
      set({ blog: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message || "Session expred");
    } finally {
      set({ isGettingBlog: false });
    }
  },
}));