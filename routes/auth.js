const router = require('express').Router();
const {signin, signup} = require('../controllers/auth')

router.post('/' ,signin);

router.post('/signup', signup)

module.exports = router;