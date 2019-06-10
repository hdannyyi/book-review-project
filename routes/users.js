const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UsersControllers = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('template', {
        locals: {
            title: 'Users Page',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-index'
        }
  });
});

router.get('/login', UsersControllers.login_get);
router.get('/signup', UsersControllers.signup_get);
router.get('/logout', UsersControllers.logout_get);

router.post('/login', UsersControllers.login_post);
router.post('/signup', UsersControllers.signup_post);


module.exports = router;