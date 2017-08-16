const User = require('../models/user');
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

    return router;
}
