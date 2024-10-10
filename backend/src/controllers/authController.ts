import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/User';
import { sendEmail } from '../services/emailService';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, phoneNo, gender, userType, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNo,
      gender,
      userType,
      password: hashedPassword,
    });

    const welcomeMessage = `Welcome ${firstName}! Your password is ${password}`;
    await sendEmail(email, 'Welcome to Job Portal', welcomeMessage);
    
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add other methods like login, reset password, etc.
