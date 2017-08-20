const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema;

let nameChecker = (bug) => {
  if (!bug) {
    return false;
  } else {
    if (bug.length < 1 && bug.length > 50) {
      return false;
    } else {
      return true;
    }
  }
};

const nameValidator = [
  {
    validator: nameChecker,
    message: 'Bug length must be between 1 to 50'
  },
];


const bugSchema = new Schema({
  name: { type: String, required: true, validate: nameValidator },
  description: { type: String, required: true },
  createdBy: { type: String },
  createdLoginId : { type: String},
  createdAt: { type: Date, default: Date.now() },
  status: { type: String, required: true },
  priority: { type: String, default: 'low' },
  assignee: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  estimatedTime: { type: Number, required: true},
  percentDone: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Bug', bugSchema);