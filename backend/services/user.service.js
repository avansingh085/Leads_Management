import UserModel from "../schemas/user.schema.js";

class UserService{

    async getUserById(id){
        
         return await UserModel.findById(id).select('-password');
        
    }

    async updateUser(id,data){
        return await UserModel.findByIdAndUpdate(id,data,{upsert:true});
    }

    async deleteUser(id)
    {
        return await UserModel.findByIdAndDelete(id);
    }
}

export default new UserService();