//import { Assignment } from '../models/assignmentModel.js';
import * as assignmentService from "../Services/assignmentService.js";
import { Credentials } from "../Services/authU.js";



export const createAssignmentDb = async (req, res) => {
  const assignmentData = req.body;

  try {
    console.log("this is the authorze user",req.authUser)
    assignmentData.createdBy = req.authUser.email;//Credentials(req)[0];

    // Create the assignment
    let assignment = await assignmentService.createAssignmentDb(assignmentData);
    // delete assignment?.createdBy;
    res.status(201).json(assignment);
  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};



export const getAssigByID = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await assignmentService.getAssigByID(id);

    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }

    res.status(200).json(assignment);
  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};



export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const assignmentData = req.body;
  const email = Credentials(req)[0];

  // Validate assignmentData before processing
  if (!assignmentData || Object.keys(assignmentData).length === 0) {
    return res.status(400).json({ error: 'No data provided for update.' });
  }

  // Additional validation rules can be added as needed, e.g., 
  // if (!assignmentData.title) {
  //   return res.status(400).json({ error: 'Title is required.' });
  // }

  try {
    if (await assignmentService.updateAssByID(id, assignmentData, email)) {
      res.status(204).send();
    } else {
      res.status(403).send();
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


function validateRequestBody(req, res, next) {
    const { name, points, num_of_attempts, deadline } = req.body;
    if (!name || !points || !num_of_attempts || !deadline) {
        return res.status(400).send('Bad Request: Missing required parameters.');
    }
    next();
}   
export const deleteAssignment = async (req, res) => {
  const { id } = req.params;

  const email = Credentials(req)[0];
  try {
    if (await assignmentService.deleteAssignmentById(id, email)) {
      res.status(204).send();
      } else {
      res.status(403).send();
    }
    
    
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


export const getAss = async (req, res) => {
  try {
    const assignments = await assignmentService.getAss();
 
    if (!assignments || assignments.length === 0) {
      throw new Error("Forbidden"); 
    }
    res.status(200).json(assignments);
  } catch (error) {
    if (error.message === "Forbidden") {
      res.status(403).json({ error: "Forbidden" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const handlePatchMethod = async (req, res) => {
  if (req.method === 'PATCH') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

};  


