const express = require('express');
const { setReminder, removeReminder } = require('../controllers/reminderController');

const router = express.Router();

router.post('/', setReminder);
router.delete('/:reminderId', removeReminder);

module.exports = router;
