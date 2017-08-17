const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema;

let projectNameLengthChecker = (project) => {
  if (!project) {
    return false;
  } else {
    if (project.length < 1 && project.length > 20) {
      return false;
    } else {
      return true;
    }
  }
};

const projectNameLengthValidator = [
  {
    validator: projectNameLengthChecker,
    message: 'Project length must be between 1 to 20'
  },
];

let projectDescriptionLengthChecker = (project) => {
  if (!project) {
    return false;
  } else {
    if (project.length < 1 && project.length > 20) {
      return false;
    } else {
      return true;
    }
  }
};

const projectDescriptionValidator = [
  {
    validator: projectDescriptionLengthChecker,
    message: 'Project description must be between 1 to 100'
  },
];


let memberChecker = (member) => {
  if (member.length <= 0) {
    return false;
  } else {
      return true;
  }
};

const memberValidators = [
  {
    validator: memberChecker,
    message: 'Project must have atleast one member'
  }
];

const projectSchema = new Schema({
  projectName: { type: String, required: true, validate: projectNameLengthValidator },
  projectDescription: { type: String, required: true, validate: projectDescriptionValidator },
  createdBy: { type: String },
  createdLoginId : { type: String},
  createdAt: { type: Date, default: Date.now() },
  members: { type: Array, required: true, validate: memberChecker},
});

module.exports = mongoose.model('Project', projectSchema);