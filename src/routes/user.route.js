import express from 'express';
import { registerUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register", registerUser);
// another way to write the above line is using router.route() method which is more readable and easy to understand.
// router.route("/register").post(registerUser);

export default router;

