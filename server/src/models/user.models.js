import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
      firstname:{
         type: String,
         required:[true, "First name is required"],
      }, 
      lastname:{
         type: String,
         required:[true, "last name is required"],
      },
      username :{
        type : String,
        required : [true,"Username is required"],
        unique : true,
    },
     email : {
        type: String,
        required:true,
        unique:true,
     },
     password:{
        type:String,
        required:true,
     },
     avatar:{
        type:{
            url:String,
            public_id:String,
        },
        default:{
            url:"https://placehold.co/600x400",
            public_id:"",
        },
     },
     bio:{
        type:String,
     }, 
     followers:[{
      type: Schema.Types.ObjectId,
      ref:"User",
     }],
     following:[{
      type: Schema.Types.ObjectId,
      ref:"User",
     }],
     socialLinks:{
      twitter:{
         type:String,
      },
       github:{
         type:String,
      },
       website:{
         type:String,
      },
     },
     blogs:[
        {
            type:Schema.Types.ObjectId,
            ref:"Blogs"
        },
     ],
     isEmailVarified:{
        type:Boolean,
     },
     emailVeridicationToken:{
        type : Number,
     },    
},
{timestamp:true},
);

const User = mongoose.model("User", userSchema);
export default User;