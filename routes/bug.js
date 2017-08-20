const User = require('../models/user');
const Project = require('../models/project');
const Bug = require('../models/bug');
const config = require('../config/database');

module.exports = (router) => {

    router.post('/createBug', (req, res) => {
        if (!req.body.name) {
            res.json({ success: false, message: 'You must provide bug name' });
        }
        else {
            if (!req.body.description) {
                res.json({ success: false, message: 'You must provide bug description' });
            } else {
                if (!req.body.createdLoginId) {
                    res.json({ success: false, message: 'LoginId not provided' });
                } else {
                    if (!req.body.createdBy) {
                        res.json({ success: false, message: 'Username not provided' });
                    } else {
                        if (!req.body.status) {
                            res.json({ success: false, message: 'bug priority is required!' });
                        } else {
                            if (!req.body.assignee) {
                                res.json({ success: false, message: 'Assignee name is needed!' });
                            } else {
                                if (!req.body.startDate) {
                                    res.json({ success: false, message: 'bug start date is required!' });
                                } else {
                                    if (!req.body.dueDate) {
                                        res.json({ success: false, message: 'bug due date is required' });
                                    } else {
                                        let bug = new Bug({
                                            name: req.body.name,
                                            description: req.body.description,
                                            createdLoginId: req.body.createdLoginId,
                                            createdBy: req.body.createdBy,
                                            status: req.body.status,
                                            priority: req.body.priority,
                                            assignee: req.body.assignee,
                                            startDate: req.body.startDate,
                                            dueDate: req.body.dueDate,
                                            estimatedTime: req.body.estimatedTime,
                                            percentDone: req.body.percentDone,
                                        });

                                        bug.save((err, data) => {
                                            if (err) {
                                                if (err.errors) {
                                                    if (err.errors.status) {
                                                        res.json({ success: false, message: err.errors.status.message });
                                                    } else {
                                                        if (err.errors.priority) {
                                                            res.json({ success: false, message: err.errors.priority.message });
                                                        } else {
                                                            if (err.errors.assignee) {
                                                                res.json({ success: false, message: err.errors.assignee.message });
                                                            } else {
                                                                if (err.errors.startDate) {
                                                                    res.json({ success: false, message: err.errors.name.startDate });
                                                                } else
                                                                    res.json({ success: false, message: err });
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    res.json({ success: false, message: 'Could not save user. Error: ', err });
                                                }
                                            } else {
                                                res.json({ success: true, data: data, message: 'New bug has been created! Redirecting to bug page' });
                                            }
                                        });
                                    }
                                }
                            }
                        }


                    }
                }
            }
        }
    });

    router.get('/getSingleBug/:bugId', (req, res) => {
        if (!req.params.bugId) {
            res.json({ success: false, message: 'Bug id not provided!' });
        } else {
            Bug.find({ _id: req.params.bugId }, (err, bug) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!bug) {
                        res.json({ success: false, message: 'bug does not exist' });
                    } else {
                        res.json({ success: true, bug: bug });
                    }
                }
            });
        }
    });

    router.get('/allBugs/:loginId', (req, res) => {
    bugR = [];
    Bug.find({}, (err, bug) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (![bug]) {
          res.json({ success: false, message: 'Currently there are no bug' });
        } else {
            // need to change
        //   bug.forEach(bug => {
        //     if (bug.members.includes(req.params.loginId)) {
        //       bugR.push(bug);
        //     }
        //   });
          res.json({ success: true, bug: bug });
        }
      }
    }).sort({ '_id': -1 });
  });


    return router;
}
