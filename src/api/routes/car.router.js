import express from 'express';
import carControllers from '../controllers/car.controller.js';
const router = express.Router();
router.post('/create', carControllers.create);
router.get('/:slug', carControllers.show);
router.get('/', carControllers.index);
export default router;