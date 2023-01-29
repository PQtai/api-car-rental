import express from 'express';
import authenInfoControllers from '../controllers/authenInfo.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();
router.post('/create', authMiddleware.verifyToken,authenInfoControllers.create);
export default router;
