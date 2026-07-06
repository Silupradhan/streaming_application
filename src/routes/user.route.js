import express from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post("/register",upload.fields([{name : "avatar", maxCount : 1}, {name : "coverImage", maxCount : 1}]), registerUser);
// another way to write the above line is using router.route() method which is more readable and easy to understand.
// router.route("/register").post(registerUser);

export default router;

