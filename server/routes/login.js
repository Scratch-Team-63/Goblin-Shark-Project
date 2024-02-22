const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js')

router.post('/', userController.verifyUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  console.log('Verify user last middleware hit')
  return res.status(200).json({valid: true})
})


module.exports = router;