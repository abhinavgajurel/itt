const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema;

let postLengthChecker = (post) => {
  if (!post) {
    return false;
  } else {
    if (post.length > 100) {
      return false;
    } else {
      return true;
    }
  }
};

const postValidator = [
  {
    validator: postLengthChecker,
    message: 'Post must not exceed 100 character'
  },
];

let answerLengthChecker = (answer) => {
  if (!answer[0]) {
    return false;
  } else {
    if (answer[0].length < 1 || answer[0].length > 100) {
      return false;
    } else {
      return true;
    }
  }
};

const answerValidators = [
  {
    validator: answerLengthChecker,
    message: 'answers may not exceed 100 characters.'
  }
];

const postSchema = new Schema({
  content: { type: String, required: true, validate: postValidator },
  createdBy: { type: String },
  createdLoginId : { type: String},
  createdAt: { type: Date, default: Date.now() },
  votes: { type: Number, default: 0 },
  votedBy: { type: Array },
  answers: [{
    answer: { type: String, validate: answerValidators },
    answerBy: { type: String }
  }]
});

module.exports = mongoose.model('Post', postSchema);