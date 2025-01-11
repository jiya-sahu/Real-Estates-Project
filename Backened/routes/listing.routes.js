import express from 'express';
import { createlisting } from '../controller/listing.controller.js';


const router = express();

router.post('/create',createlisting)
export default router;