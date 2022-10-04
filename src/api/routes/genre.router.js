import express from 'express';
import genreControllers from '../controllers/genre.controller.js';
const router = express.Router();
//route /genre
router.post('/create', genreControllers.create);
router.get('/', genreControllers.index);
export default router;