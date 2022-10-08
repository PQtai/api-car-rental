import express from 'express';
import genreControllers from '../controllers/genre.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();
//route /genre
router.post('/create', genreControllers.create);
router.get('/:id', genreControllers.show);
router.delete('/:id', authMiddleware.authIsAdmin ,genreControllers.delete);
router.patch('/:id/edit' ,authMiddleware.authIsAdmin,genreControllers.update);
router.get('/', genreControllers.index);
export default router;