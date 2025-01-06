import express from 'express'
import { usercontroller,updateUsercontroller} from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyuser.js';

const router = express.Router();

router.get('/', usercontroller);
router.post('/update:id', verifyToken ,updateUsercontroller);

export default router;