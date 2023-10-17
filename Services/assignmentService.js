import { Assignment } from "../Models/Assignment.js";


export const getAss = async (req, res) => {
  const assignments = await Assignment.findAll();
  return assignments;
};

export const createAssignmentDb = async (assignmentData) => {
  console.log(assignmentData.createdBy);
  let  assignment = await Assignment.create(assignmentData); //inbuilt method

  return assignment;
};

export const getAssigByID = async (id) => {
  try {
    return await findAssign(id);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteAssignmentById = async (id, email) => {
  try {
    const assignment = await findAssign(id);

    if (!assignment) {
        res.status(404).json();
    }

    if (email == assignment.createdBy) {
      await assignment.destroy();
      return true;
    } else {
      return false;  // This indicates that the email didn't match the creator.
    }
  } catch (error) {
    res.status(404).json();
  }
};


export const updateAssByID = async (id, assignmentData, email) => {
  try {
    const assignment = await findAssign(id);
    assignment.name = assignmentData.name;
    assignment.points = assignmentData.points;
    assignment.num_of_attempts = assignmentData.num_of_attempts;
    assignment.deadline = assignmentData.deadline;
    assignment.assignment_updated = new Date().toISOString();

    if (email == assignment.createdBy) {
      await assignment.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findAssign = async (id) => {
  const assignment = await Assignment.findOne({ where: { id } });
  if (!assignment) {
    throw new Error("Assignment not found");
  }
  return assignment;
};