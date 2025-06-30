import Blog from "../models/blog.model.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import Like from "../models/like.model.js";

export const getAllBlogs = asyncHandler(async (req, res, next) => {
  const userId = req.id;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }
  const blogs = await Blog.findOne({});

  return res
    .status(200)
    .json(new ApiResponse(200, blogs, `blogs successfully send`));
});

export const getFeedBlogs = asyncHandler(async (req, res, next) => {
  const userId = req.id;

  const user =  await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "no user exists");
  }


  return res.status(200).json(new ApiResponse(200, {}, "Feed Blogs Fetched"));
});

export const getBlogsByID = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.id;

  const user = await User.findById(userId);
  const blog = await Blog.findById(blogId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blog, `update blog successfully`));
});

export const createBlog = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const userId = req.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  if (!title || !description) {
    throw new ApiError(400, "All fields are required");
  }

  const existingBlog = await Blog.findOne({ title });
  if (existingBlog) {
    throw new ApiError(400, "Blog with same title exists");
  }

  const newBlog = await Blog.create({ title, description, author: userId });

  user.blogs.push(newBlog._id);
  await user.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newBlog,
        `${user.username} created new blog ${newBlog.title}`,
      ),
    );
});

export const updateBlog = asyncHandler(async (req, res, next) => {
  const { title, description, content, tags } = req.body;
  const userId = req.id;
  const blogId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const blog = await Blog.findOne({ _id: blogId, author: userId });

  let coverImageUrl;
  if (req.files) {
    console.log(req.files);
    coverImageUrl = req.files.coverImage[0].path;
  }

  if (coverImageUrl) {
    if (blog.coverImage.public_id !== "") {
      await deleteOnCloudinary(blog.coverImage.public_id);
    }

    const result = await uploadOnCloudinary(coverImageUrl, "coverImages");

    blog.coverImage.url = result.secure_url;
    blog.coverImage.public_id = result.public_id;
  }

  if (title) blog.title = title;
  if (description) blog.description = description;
  if (content) {
    blog.content = content;
    blog.readTime = Math.ceil(content.split(" ").length / 100);
  }
  if (tags) blog.tags = tags.split(",").map((tag) => tag.trim());
  await blog.save();

  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog updated successfully"));
});

export const deleteBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.id;

  const user = await User.findById(userId);
  const blog = await Blog.findById(blogId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
  await Blog.findByIdAndDelete(blogId);

  return res
    .status(200)
    .json(new ApiResponse(200, blog, `blogs successfully deleted`));
});

export const toggleLike = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.id;

  const blog = await Blog.findById(blogId);

   const user = await User.findById(userId);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const existingLike = await Like.findOne({
    user: userId,
    target: "blog",
    targetId: blogId,
  });

  let message;
  if (existingLike) {
    // To UnLike
    await Like.deleteOne({
      user: userId,
      target: "blog",
      targetId: blogId,
    });

    await blog.updateOne({
      $pull: { likes: existingLike._id },
    });

    message = `${user.username} unliked the blog`;
  } else {
    // To Like
    const newLike = await Like.create({
      user: userId,
      target: "blog",
      targetId: blogId,
    });

    await blog.updateOne({
      $push: { likes: newLike._id },
    });
    message = `${user.username} liked the blog`;
  }

  return res.status(200).json(new ApiResponse(200, null, message));
});

export const previewBlog = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const blogId = req.params.id;

  if (!userId) {
    throw new ApiError(404, "No user with this userId exists");
  }

  if (!blogId) {
    throw new ApiError(404, "No blog with this id exists");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "No blog with this id exists");
  }

  if (!blog.readers.includes(userId)) {
    blog.readers.push(userId);
    blog.views++;
    await blog.save();
    return res.status(200).json(new ApiResponse(200, null, `Blog Previewed`));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, null, `Blog Already Previewed`));
});

export const publishBlog = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const blogId = req.params.id;

  if (!userId) {
    throw new ApiError(404, "No user with this userId exists");
  }

  if (!blogId) {
    throw new ApiError(404, "No blog with this id exists");
  }

  const blog = await Blog.findOne({ _id: blogId, author: userId });

  if (!blog) {
    throw new ApiError(404, "No blog with this id exists");
  }

  blog.isPublished = !blog.isPublished;
  blog.publishedAt = blog.isPublished ? Date.now() : null;
  await blog.save();

  return res.status(200).json(new ApiResponse(200, blog, `Blog Published`));
});