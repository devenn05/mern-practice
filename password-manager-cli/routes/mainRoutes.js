const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.getDashboard);
router.post('/add', mainController.addCredentials);
router.get('/view/:id', mainController.viewCredentials);
router.get('/backup-downloade', mainController.downloadBackup);

module.exports = router;