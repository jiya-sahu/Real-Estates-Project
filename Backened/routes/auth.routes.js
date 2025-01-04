import express from 'express'
import { signin, signup ,googleauth} from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',googleauth);
export default router;