import { Router } from 'express';
import {bootstrap} from '../Services/userService.js';


const router = Router();


router.route("/get").get(bootstrap);




export default router;
//exported router