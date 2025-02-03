import express from 'express';
import { createlisting ,deleteListing,updatelisting} from '../controller/listing.controller.js';
import verifyToken from '../utils/verifyuser.js';

const router = express();

router.post('/create',createlisting)
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updatelisting);
export default router;