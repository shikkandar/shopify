import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a unique Username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role:{
    type: String,
    enum: ["admin", "user"],
    default: "user"  
  }
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
