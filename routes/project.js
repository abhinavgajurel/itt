const User = require('../models/user');
const Project = require('../models/project');
const config = require('../config/database');

module.exports = (router) => {

  router.get('/allUsers', (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!users) {
          res.json({ success: false, message: 'No user found.' });
        } else {
          res.json({ success: true, users: users });
        }
      }
    }).sort({ '_id': -1 });
  });

  router.get('/allProjects/:loginId', (req, res) => {
    projectR = [];
    Project.find({}, (err, projects) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (![projects]) {
          res.json({ success: false, message: 'Currently there are no projects' });
        } else {
          projects.forEach(project => {
            if(project.members.includes(req.params.loginId)){
              projectR.push(project);
            }
          });
          res.json({ success: true, projects: projectR });
        }
      }
    }).sort({ '_id': -1 });
  });

  router.post('/createproject', (req, res) => {
    if (!req.body.projectName) {
      res.json({ success: false, message: 'You must provide project name' });
    }
    else {
      if (!req.body.projectDescription) {
        res.json({ success: false, message: 'You must provide project description' });
      } else {
        if (!req.body.createdLoginId) {
          res.json({ success: false, message: 'LoginId not provided' });
        } else {
          if (!req.body.createdBy) {
            res.json({ success: false, message: 'Username not provided' });
          } else {
            let project = new Project({
              projectName: req.body.projectName,
              projectDescription: req.body.projectDescription,
              createdBy: req.body.username,
              createdLoginId: req.body.loginId,
              members: req.body.selectedMembers
            });

            project.save((err, data) => {
              if (err) {
                if (err.code === 11000) {
                  res.json({ success: false, message: 'Login ID or e-mail already exists' });
                } else {
                  if (err.errors) {
                    if (err.errors.email) {
                      res.json({ success: false, message: err.errors.email.message });
                    } else {
                      if (err.errors.loginId) {
                        res.json({ success: false, message: err.errors.loginId.message });
                      } else {
                        if (err.errors.password) {
                          res.json({ success: false, message: err.errors.password.message });
                        } else {
                          if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message });
                          } else
                            res.json({ success: false, message: err });
                        }
                      }
                    }
                  } else {
                    res.json({ success: false, message: 'Could not save user. Error: ', err });
                  }
                }
              } else {
                res.json({ success: true, data: data, message: 'New Project has been created! Redirecting to project home' });
              }
            });
          }
        }
      }
    }
  });
  return router;
}
