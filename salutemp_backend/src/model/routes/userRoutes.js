const express = require('express');
const { updateUserToken, getUser, createUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/updateToken', updateUserToken);
router.get('/:userId', getUser);
router.post('/', createUser);
router.delete('/:userId', deleteUser);

module.exports = router;
