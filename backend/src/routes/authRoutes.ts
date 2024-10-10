import express from 'express';
import { register } from '../controllers/authController';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email is not valid'),
  body('phoneNo').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], register);

export default router;
