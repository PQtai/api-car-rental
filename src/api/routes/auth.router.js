import express from 'express';
import authControllers from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();
//route login
router.post('/login', authControllers.login);
//route register
router.post('/register', authControllers.register);
router.post('/admin/register',authMiddleware.authIsAdmin ,authControllers.register);
router.post('/logout',authControllers.logout);
router.delete('/:id', authMiddleware.authIsAdmin ,authControllers.delete);
router.patch('/:id/edit' ,authMiddleware.authIsAdmin,authControllers.update);
router.get('/refresh',authMiddleware.verifyToken,authControllers.reqRefreshToken);
export default router;