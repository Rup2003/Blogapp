import { Router } from "express";
import { getProfile, loginUser, logoutUser, registerUser, toggleFollow, updateUser } from "../controller/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const userRouter = Router();
userRouter.post("/login",loginUser)
userRouter.get("/logout", isAuthenticated, logoutUser)
userRouter.post("/register", registerUser)
userRouter.put("/updateUser",isAuthenticated, updateUser)
userRouter.get("/profile", isAuthenticated, getProfile)

userRouter.put(
  "/update",
  isAuthenticated,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  updateUser,
);

userRouter.post("/follow/:id",isAuthenticated,toggleFollow);

export default userRouter;