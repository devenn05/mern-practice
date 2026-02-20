const express = require('express');
const router = express.Router();
const operationController = require('../controllers/operationController');

router.get('/', operationController.getTasks);
router.post('/add-task', operationController.addTasks);
router.post('/delete-task/:taskId', operationController.deleteTasks);

module.exports = router;

