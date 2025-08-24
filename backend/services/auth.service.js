import UserModel from "../schemas/user.schema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.util.js";

class AuthService {

    
  async login({ email, password }) {
    const isUserExist = await UserModel.findOne({ email });
    if (!isUserExist)
    {
       
      return { error: "Invalid email, user does not exist" };
    }

    const isMatchPassword = await bcrypt.compare(password, isUserExist.password);
   
    if (!isMatchPassword)
      return { error: "Please enter a valid password" };

    const user = isUserExist.toObject();
    delete user.password;

    const { error, token } = await generateToken({ id: user._id }, "2h");

    if (error) return { error };

    return { token, user };
  }



  async register(body) {
    const isExistUser = await UserModel.findOne({ email: body.email });
    if (isExistUser)
      return { error: "User already exists or invalid email" };

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(body.password, saltRounds);

    const newUser = await UserModel.create({
      ...body,
      password: hashPassword,
    });

    if (!newUser)
      return { error: "Failed to register user. Please enter valid data" };

    return { message: "User registered successfully" };
  }
}

export default new AuthService();
