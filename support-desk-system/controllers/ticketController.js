const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
const logAction = require('../utils/logger');

const getTickets = ()=>{
    const jsonData = fs.readFileSync('./tickets.json', 'utf-8');
    return JSON.parse(jsonData);
}

const saveTickets = (data) =>{
    fs.writeFileSync('./tickets.json', JSON.stringify(data, null, 2));
}

exports.getDashboard = catchAsync((req, res, next)=>{
    const tickets = getTickets();
    res.render('dashboard', {tickets: tickets});
})

exports.createTicket = catchAsync((req, res,next)=>{
    const tickets = getTickets();
    const priority = req.body.priority;
    if (!['low','medium','high'].includes(priority)){
        throw new Error("Priority must be low, medium, or high");
    }
    tickets.push({
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: 'open'
    })
    saveTickets(tickets);
    res.redirect('/tickets');
});

exports.updateTicket = catchAsync((req, res, next)=>{
    const tickets = getTickets();
    const {id} = req.params;
    const {newStatus} = req.body;

    const currentTicketIndex = tickets.findIndex(t => t.id === id);
    if (currentTicketIndex === -1) throw new Error("Ticket Not Found");

    const oldStatus = tickets[currentTicketIndex].status;

    tickets[currentTicketIndex].status = newStatus;
    saveTickets(tickets);

    logAction(`STATUS UPDATED: ${oldStatus} -> ${newStatus}`, id);
    res.redirect('/tickets');
})
