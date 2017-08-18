const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

  router.post('/register', (req, res) => {
    if(!req.body.name){
      res.json({ success: false, message: 'You must provide name' });
    }
    else {
    if (!req.body.email) {
      res.json({ success: false, message: 'You must provide an e-mail' });
    } else {
      if (!req.body.loginId) {
        res.json({ success: false, message: 'You must provide a login id' });
      } else {
        if (!req.body.password) {
          res.json({ success: false, message: 'You must provide a password' });
        } else {
          let user = new User({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            loginId: req.body.loginId.toLowerCase(),
            password: req.body.password
          });
          user.save((err) => {
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
              res.json({ success: true, message: 'Account registered!' }); 
            }
          });
        }
      }
    }
    }
  });

  router.get('/checkEmail/:email', (req, res) => {
    if (!req.params.email) {
      res.json({ success: false, message: 'E-mail was not provided' });
    } else {
      User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          if (user) {
            res.json({ success: false, message: 'E-mail is already taken' }); 
          } else {
            res.json({ success: true, message: 'E-mail is available' });
          }
        }
      });
    }
  });

  router.get('/checkLoginId/:loginId', (req, res) => {
    if (!req.params.loginId) {
      res.json({ success: false, message: 'loginId was not provided' }); 
    } else {
      User.findOne({ loginId: req.params.loginId }, (err, user) => { 
        if (err) {
          res.json({ success: false, message: err }); 
        } else {
          if (user) {
            res.json({ success: false, message: 'loginId is already taken' });
          } else {
            res.json({ success: true, message: 'loginId is available' }); 
          }
        }
      });
    }
  });

    router.post('/login', (req, res) => {
    if (!req.body.loginId) {
      res.json({ success: false, message: 'No login id provided' });
    } else {
      if (!req.body.password) {
        res.json({ success: false, message: 'No password provided.' });
      } else {
        User.findOne({ loginId: req.body.loginId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            if (!user) {
              res.json({ success: false, message: 'Invalid Login ID.' });
            } else {
              const validPassword = user.comparePassword(req.body.password);
              if (!validPassword) {
                res.json({ success: false, message: 'Invalid Password' });
              } else {
                const token = jwt.sign({ loginId: user._id }, config.secret, { expiresIn: '1hr' });
                res.json({
                  success: true,
                  message: 'Login success! Redirecting',
                  token: token,
                  user: {
                    loginId: user.loginId
                  }
                });
              }
            }
          }
        });
      }
    }
  });

  router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      res.json({ success: false, message: 'No token provided' });
    } else {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  });

   router.get('/profile', (req, res) => {
    User.findOne({ _id: req.decoded.loginId }).select('loginId email name').exec((err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({ success: false, message: 'User not found' });
        } else {
          res.json({ success: true, user: user });
        }
      }
    });
  });

  
  return router; 
}
