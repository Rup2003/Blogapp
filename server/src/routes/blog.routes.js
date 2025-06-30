import { Router } from "express";
import { addComment, createBlog, deleteBlog, getAllBlogs, getBlogsByID, getComment, getFeedBlogs, toggleLike, updateBlog } from "../controller/blog.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const blogRouter = Router();

blogRouter.get("/all",getAllBlogs);
blogRouter.get("/feed", getFeedBlogs);
blogRouter.get("/:id", getBlogsByID);
blogRouter.post("/create", isAuthenticated,createBlog);
blogRouter.put("/update",updateBlog)
blogRouter.delete("/delete", deleteBlog);
blogRouter.post("/like/:id", toggleLike);
blogRouter.post("/comment/:id", addComment);
blogRouter.get("/comments", getComment);

export default blogRouter;