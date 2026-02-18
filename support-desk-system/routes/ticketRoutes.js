const express = require('express');
const router = express.Router();
const fs = require('fs');
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getDashboard);
router.post('/add-ticket', ticketController.createTicket);

module.exports = router;