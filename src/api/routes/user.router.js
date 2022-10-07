import express from 'express';
import userControllers from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();
//route user
router.get('/', authMiddleware.authIsAdmin ,userControllers.index);
export default router;