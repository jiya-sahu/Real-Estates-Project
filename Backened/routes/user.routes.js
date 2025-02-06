import express from 'express'
import { usercontroller,updateUsercontroller, deleteuser,getUserListings,getUser} from '../controller/user.controller.js';
import verifyToken  from '../utils/verifyuser.js';

const router = express.Router();

router.get('/test', usercontroller);
router.post('/update/:id', verifyToken ,updateUsercontroller);
router.delete('/delete/:id',verifyToken,deleteuser);
router.get('/listing/:id',verifyToken,getUserListings);
router.get('/:id',verifyToken,getUser)

export default router;