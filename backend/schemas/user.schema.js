import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true}
})

const User=new mongoose.model('User',UserSchema);
export default User;