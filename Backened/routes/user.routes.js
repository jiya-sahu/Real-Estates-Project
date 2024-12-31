import express from 'express'
import { usercontroller } from '../controller/user.controller.js';

const router = express.Router();

router.get('/', usercontroller);


export default router;