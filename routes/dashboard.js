const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

    router.post('/newPost', (req, res) => {
        if (!req.body.content) {
            res.json({ success: false, message: 'Post content needed' });
        } else {
            if (!req.body.createdBy) {
                res.json({ success: false, message: 'post creator is required.' });
            } else {
                const c = req.body.content; //need to check
                const post = new Post({
                    content: c,
                    createdBy: req.body.createdBy,
                    createdLoginId: req.body.createdLoginId
                });
                post.save((err) => {
                    if (err) {
                        if (err.errors) {
                            if (err.errors.body) {
                                res.json({ success: false, message: err.errors.body.message });
                            } else {
                                res.json({ success: false, message: err });
                            }
                        } else {
                            res.json({ success: false, message: err });
                        }
                    } else {
                        res.json({ success: true, message: 'You have successfully posted your query' });
                    }
                });
            }
        }
    });

    router.get('/allPosts', (req, res) => {
        Post.find({}, (err, posts) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!posts) {
                    res.json({ success: false, message: 'No posts found.' });
                } else {
                    res.json({ success: true, posts: posts });
                }
            }
        }).sort({ '_id': -1 });
    });

    router.put('/editPost', (req, res) => {
        if (!req.body._id) {
            res.json({ success: false, message: 'No post id provided' });
        } else {
            Post.findOne({ _id: req.body._id }, (err, post) => {
                if (err) {
                    res.json({ success: false, message: 'Not a valid post id' });
                } else {
                    if (!post) {
                        res.json({ success: false, message: 'Post id was not found.' });
                    } else {
                        User.findOne({ _id: req.decoded.loginId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate user.' });
                                } else {
                                    if (user.loginId !== post.createdLoginId) {
                                        res.json({ success: false, message: 'You are not authorized to edit this post.' });
                                    } else {
                                        post.content = req.body.content;
                                        post.save((err) => {
                                            if (err) {
                                                if (err.errors) {
                                                    res.json({ success: false, message: 'Please ensure form is filled out properly' });
                                                } else {
                                                    res.json({ success: false, message: err });
                                                }
                                            } else {
                                                res.json({ success: true, message: 'Your post has been updated!' });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    router.delete('/deletePost/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No id provided' });
        } else {
            Post.findOne({ _id: req.params.id }, (err, post) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid id' });
                } else {
                    if (!post) {
                        res.json({ success: false, messasge: 'Post was not found' });
                    } else {
                        User.findOne({ _id: req.decoded.loginId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate user.' });
                                } else {
                                    if (user.loginId !== post.createdLoginId) {
                                        res.json({ success: false, message: 'You are not authorized to delete this post' });
                                    } else {
                                        post.remove((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err });
                                            } else {
                                                res.json({ success: true, message: 'You have successfully deleted the post!' });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    router.put('/votePost', (req, res) => {
        if (!req.body.id) {
            res.json({ success: false, message: 'No id was provided.' });
        } else {
            Post.findOne({ _id: req.body.id }, (err, post) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid post id' });
                } else {
                    if (!post) {
                        res.json({ success: false, message: 'Post not found.' });
                    } else {
                        User.findOne({ _id: req.decoded.loginId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: 'Something went wrong.' });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Could not authenticate user.' });
                                } else {
                                        if (post.votedBy.includes(user.loginId)) {
                                            res.json({ success: false, message: 'You already voted for this post.' });
                                        } else {
                                            post.votes++;
                                            post.votedBy.push(user.loginId);
                                            post.save((err) => {
                                                if (err) {
                                                    res.json({ success: false, message: 'Something went wrong.' });
                                                } else {
                                                    res.json({ success: true, message: 'Post Voted!' });
                                                }
                                            });
                                        }
                                    
                                }
                            }
                        });
                    }
                }
            });
        }
    });

router.put('/unVotePost', (req, res) => {
        if (!req.body.id) {
            res.json({ success: false, message: 'No id was provided.' });
        } else {
            Post.findOne({ _id: req.body.id }, (err, post) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid post id' });
                } else {
                    if (!post) {
                        res.json({ success: false, message: 'Post not found.' });
                    } else {
                        User.findOne({ _id: req.decoded.loginId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: 'Something went wrong.' });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Could not authenticate user.' });
                                } else {
                                        if (post.votedBy.includes(user.loginId)) {
                                            post.votes--;
                                            const arrayIndex = post.votedBy.indexOf(user.loginId);
                                            post.votedBy.splice(arrayIndex, 1);
                                            post.save((err) => {
                                                if (err) {
                                                    res.json({ success: false, message: 'Something went wrong.' });
                                                } else {
                                                    res.json({ success: true, message: 'Post Voted!' });
                                                }
                                            });
                                        } else {
                                            res.json({ success: false, message: 'You have not voted this post.' });
                                            
                                        }
                                    
                                }
                            }
                        });
                    }
                }
            });
        }
    });


    router.post('/answerPost', (req, res) => {
        if (!req.body.answer) {
            res.json({ success: false, message: 'No answer provided' });
        } else {
            
            if (!req.body.id) {
                res.json({ success: false, message: 'No id was provided' }); 
            } else {
                
                Post.findOne({ _id: req.body.id }, (err, post) => {
                    if (err) {
                        res.json({ success: false, message: 'Invalid post id' });
                    } else {
                        if (!post) {
                            res.json({ success: false, message: 'Post not found.' });
                        } else {
                            User.findOne({ _id: req.decoded.loginId }, (err, user) => {
                                if (err) {
                                    res.json({ success: false, message: 'Something went wrong' });
                                } else {
                                    if (!user) {
                                        res.json({ success: false, message: 'User not found.' });
                                    } else {
                                        const a = req.body.answer;
                                        post.answers.push({
                                            answer: a,
                                            answerBy: user.name
                                        });
                                        post.save((err) => {
                                            if (err) {
                                                res.json({ success: false, message: 'Something went wrong.' });
                                            } else {
                                                res.json({ success: true, message: 'Your answer has been posted!' });                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    router.get('/getPost/:id', (req, res) => {
    if (!req.params.id) {
      res.json({ success: false, message: 'No post id provided.' });
    } else {
      Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
          res.json({ success: false, message: 'Not a valid post id' });
        } else {
          if (!post) {
            res.json({ success: false, message: 'post not found.' });
          } else {
            User.findOne({ _id: req.decoded.loginId }, (err, user) => {
              if (err) {
                res.json({ success: false, message: err });
              } else {
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user' });
                } else {
                  if (user.loginId !== post.createdLoginId) {
                    res.json({ success: false, message: 'You are not authorized to eidt this post.' });
                  } else {
                    res.json({ success: true, post: post });
                  }
                }
              }
            });
          }
        }
      });
    }
  });


    return router;
};