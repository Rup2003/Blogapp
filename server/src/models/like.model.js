import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    target:{
      type:String,
      enum:["blog","comment"],
    },
    targetId:{
      type:Schema.Types.ObjectId,
      ref:"Blog" || "Comment",
    },
  },
  { timestamps: true },
);

const Like = mongoose.model("Like", likeSchema);
export default Like;