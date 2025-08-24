import express from "express";
import userController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";
const router=express.Router();

router.use(verifyToken);

router.get('/',userController.getUser);

router.put('/',userController.updateUser);

router.delete('/',userController.deleteUser)

export default router;

