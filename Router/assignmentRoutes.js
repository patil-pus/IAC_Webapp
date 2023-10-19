import { Router } from 'express';
import * as assignmentController from '../Controllers/assigmentContoller.js';
import { Check } from '../Services/authU.js';


const router = Router();


router.get('/', Check, assignmentController.getAss);
router.post('/',Check, assignmentController.createAssignmentDb);
router.get('/:id', Check, assignmentController.getAssigByID);
router.delete('/:id',Check,assignmentController.deleteAssignment);
router.put('/:id',Check, assignmentController.updateAssignment);
router.patch( '/', assignmentController.handlePatchMethod);


export default router;