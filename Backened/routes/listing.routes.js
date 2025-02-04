import express from 'express';
import { createlisting ,deleteListing,updatelisting,getListing} from '../controller/listing.controller.js';
import verifyToken from '../utils/verifyuser.js';

const router = express();

router.post('/create',createlisting)
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updatelisting);
router.get('/get/:id',getListing);
export default router;