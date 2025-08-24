import userService from "../services/user.service.js";

class UserController {
    
    async getUser(req, res) {
        try {
            const user = await userService.getUserById(req?.user?.id);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).send({ msg: "User not found", success: false });
        } catch (error) {
            console.error("Error in getUser:", error);
            return res.status(500).send({ msg: "Internal Server Error", success: false });
        }
    }

  
    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.user.id, req.body);
            if (user) {
                return res.status(200).json({ msg: "User updated successfully", success: true, user });
            }
            return res.status(404).send({ msg: "User not found", success: false });
        } catch (error) {
            console.error("Error in updateUser:", error);
            return res.status(500).send({ msg: "Internal Server Error", success: false });
        }
    }

    
    async deleteUser(req, res) {
        try {
            const deleted = await userService.deleteUser(req.user.id);
            if (deleted) {
                return res.status(200).send({ msg: "User deleted successfully!", success: true });
            }
            return res.status(404).send({ msg: "User not found", success: false });
        } catch (error) {
            console.error("Error in deleteUser:", error);
            return res.status(500).send({ msg: "Internal Server Error", success: false });
        }
    }
}

export default new UserController();
