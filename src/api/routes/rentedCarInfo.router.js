import express from 'express';
import rentedCarInfoControllers from '../controllers/rentedCarInfo.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();
router.post('/create', authMiddleware.verifyToken,rentedCarInfoControllers.create);
router.get('/:id', authMiddleware.authIsAdmin,rentedCarInfoControllers.show);
router.get('/', authMiddleware.authIsAdmin,rentedCarInfoControllers.index);
export default router;