import express from 'express';
import carControllers from '../controllers/car.controller.js';
const router = express.Router();
router.get('/', carControllers.index);
export default router;