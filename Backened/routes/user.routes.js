import express from 'express'
import { usercontroller,updateUsercontroller, deleteuser} from '../controller/user.controller.js';
import verifyToken  from '../utils/verifyuser.js';

const router = express.Router();

router.get('/test', usercontroller);
router.post('/update/:id', verifyToken ,updateUsercontroller);
router.delete('/delete/:id',verifyToken,deleteuser);

export default router;