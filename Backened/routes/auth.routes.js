import express from 'express'
import { signin, signup ,googleauth,uploadfile, signout} from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',googleauth);
router.post('/uploadFile',uploadfile);
router.get('/signout',signout)
export default router;