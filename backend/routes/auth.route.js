import express from 'express'
import  AuthController from '../controllers/auth.controller.js';

const router=express.Router();
   //   /api/auth/login
router.post('/login',AuthController.login);

// /api/auth/register
router.post('/register',AuthController.register);

export default router;