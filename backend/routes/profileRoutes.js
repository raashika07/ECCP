const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');          // JWT verify
const ctrl = require('../controllers/profileController');

router.get('/me', auth, ctrl.getProfile);            // GET /profile/me
router.put('/me', auth, ctrl.updateProfile);         // PUT /profile/me

module.exports = router;
