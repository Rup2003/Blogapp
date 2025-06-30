import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;

  if (!firstname || !lastname || !username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }
  const newUser = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    username,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, {}, "User created successfully"));
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All field are required");
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid Credential");
  }

  const user = await User.findOne({ email }).select("-password");
  const token = await jwt.sign(
    {
      _id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    maxAge: Date.now() + 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, user, `Welcome back ${user.username}`));
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json(new ApiResponse(200, null, "Logged out"));
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const{username,bio,twitter,github,website}=req.body;
  const userId=req.id;


  if(Object.keys(req.body).length ===0){
    throw new ApiError(400,"NO DATA IS PROVIED");
  }

  const user = await User.findById(userId);
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let avatarUrl;
  if (req.files) {
    console.log(req.files);
    avatarUrl = req.files.avatar[0].path;
  }

  if (avatarUrl) {
    if (user.avatar.public_id !== "") {
      await deleteOnCloudinary(user.avatar.public_id);
    }

    const result = await uploadOnCloudinary(avatarUrl, "avatars");
    console.log(result);

    user.avatar.url = result.secure_url;
    user.avatar.public_id = result.public_id;
  }

  if(username) user.username =username;
  if(bio) user.bio=bio;
  if(twitter) user.socialLinks.twitter=twitter;
  if(github) user.socialLinks.github =github;
  if(website) user.socialLinks.website=website;

   await user.save();

  // const {id} = req.params;
  // console.log(id);
  return res
    .status(200)
    .json(new ApiResponse(200,null, "USER UPDATED SUCCESSFULLY"));
});

export const toggleFollow = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const { id } = req.params;

  if (!userId || !id) {
    throw new ApiError(400, "All fields are required");
  }

  if (userId === id) {
    throw new ApiError(400, "You cannot follow yourself");
  }

  const user = await User.findById(userId).select("-password");
  const userToFollow = await User.findById(id).select("-password");

  const alreadyFollowing = userToFollow.followers.some(
    (followerId) => followerId.toString() === user._id.toString(),
  );
  let message;

  if (alreadyFollowing) {
    // To Unfollow
    userToFollow.followers = userToFollow.followers.filter(
      (followerId) => followerId.toString() !== user._id.toString(),
    );

    user.following = user.following.filter(
      (followingId) => followingId.toString() !== userToFollow._id.toString(),
    );

    await Follow.deleteOne({ follower: user._id, following: userToFollow._id });

    message = `${user.username} unfollowed to ${userToFollow.username}`;
  } else {
    // To Follow
    userToFollow.followers.push(user._id);

    user.following.push(userToFollow._id);

    await Follow.create({ follower: user._id, following: userToFollow._id });

    message = `${user.username} followed to ${userToFollow.username}`;
  }

  await user.save();
  await userToFollow.save();

  return res.status(200).json(new ApiResponse(200, null, message));
});