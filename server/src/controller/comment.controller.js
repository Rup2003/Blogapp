import Blog from "../models/blog.model";
import Comment from "../models/comment.model";
import Like from "../models/like.model";
import User from "../models/user.models";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";

export const addComment = asyncHandler(async (req, res, next) => {
    const { content } = req.body;
  const userId = req.id;
  const blogId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "No blog with this id exists");
  }

  const newComment = await Comment.create({
    content,
    author: userId,
    blog: blogId,
  });

  await blog.updateOne({
    $push: { comments: newComment._id },
  });

  return res.status(200).json(new ApiResponse(200, null, "Your comment added"));
});

export const getComment = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const blogId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const comment = await Comment.find({ blog: blogId });

  return res.status(200).json(new ApiResponse(200, comment, null));
});

export const toggleLikeComment = asyncHandler(async (req, res, next) =>{
    const userId = req.id;
    const commentId = req.params.id;

    const user = await User.findById(userId);
    const comment = await Comment.findById(commentId);

    if (!user) {
        throw new ApiError(404, "user not found");
    }
    if (!comment) {
        throw new ApiError(404, "comment not found");
    }
    const existingLike = await Like.findOne({
        user: userId,
        target: "comment",
        targetId : commentId,
    });

    let message;

    if (!existingLike) {
        await comment.updateOne({
            $pull: {like: existingLike._id}
        });
        comment.totalLikes = comment.totalLikes - 1;
        await comment.save();

        await Like.deleteOne({
            user: userId,
            target: "comment",
            targetId: commentId,
        }); 

        message = "you disliked the comment"; 
    }else{
        const newLike = await Like.create({
            user: userId,
            target: "comment",
            targetId: commentId,
        });
        await comment.updateOne({
            $push: {like: newLike._id}
        });
        
        comment.totalLikes = comment.totalLikes + 1;

        await comment.save();
        
        message="comment liked";
    }

     return res.status(200).json(new ApiResponse(200, null, message));
})

export const updateComment = asyncHandler(async (req, res, next) => {
   const { content } = req.body;
  const userId = req.id;
  const commentId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const comment = await Comment.findOne({ _id: commentId, author: userId });
  if (!comment) {
    throw new ApiError(404, "No comment with this id exists");
  }

  if (!content) {
    throw new ApiError(400, "All fields are required");
  }

  comment.content = content;
  await comment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Your comment updated"));
});

export const deleteComment = asyncHandler(async (req, res, next) =>{
   const userId = req.id;
  const commentId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user with this userId exists");
  }

  const comment = await Comment.findOne({ _id: commentId, author: userId });
  if (!comment) {
    throw new ApiError(404, "No comment with this id exists");
  }

  await Comment.deleteOne({ _id: commentId, author: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Your comment deleted"));
})