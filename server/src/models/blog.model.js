import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title:{
        type :String,
        required : true,
        unique : true,
    },
    description:{
        type : String,
        required : true,
    },
    content:{
        type :String,
    },
    coverImage:{
         type:{
            url:String,
            public_id:String,
        },
        default:{
            url:"https://placehold.co/600x400",
            public_id:"",
        },
    },
    author :{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    tag:[{type: String}],
    isPublisdhed:{
        type:Boolean,
        required:[true,"Is required"],
        default:false,
    },
    publishedAt:{
        type:Date,
    },
    views:{
        type: Number,
        default: 0,
    },
    readers:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    comment:[{
        type:Schema.Types.ObjectId,
        ref:"Comment",
    }],
    like:[{
        type:Schema.Types.ObjectId,
        ref:"Like"
    }],
},{timestamps:true});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;