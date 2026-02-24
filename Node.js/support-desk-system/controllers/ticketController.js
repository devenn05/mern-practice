const fs = require('fs').promises;
const catchAsync = require('../utils/catchAsync');
const logAction = require('../utils/logger');
const _ = require('lodash');

const getTickets = async()=>{
    try{
        const jsonData = await fs.readFile('./tickets.json', 'utf-8');
        return JSON.parse(jsonData);
    }catch(error){
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

const saveTickets = async(data) =>{
    await fs.writeFile('./tickets.json', JSON.stringify(data, null, 2));
}

exports.getDashboard = catchAsync(async(req, res, next)=>{
    let tickets = await getTickets();
    const {priority, status} = req.query;

    if (priority) {
        tickets = tickets.filter(t => t.priority === priority);
    }
    if (status) {
        tickets = tickets.filter(t => t.status === status);
    }

    const priorityOrder = {'high':1, 'medium':2, 'low':3};
    tickets = _.sortBy(tickets, (t)=> priorityOrder[t.priority]);

    res.render('dashboard', {
        tickets,
        currentPriority: priority
    });
})

exports.createTicket = catchAsync(async(req, res,next)=>{
    const tickets = await getTickets();
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
    await saveTickets(tickets);
    res.redirect('/tickets');
});

exports.updateTicket = catchAsync(async(req, res, next)=>{
    const tickets = await getTickets();
    const {id} = req.params;
    const {newStatus} = req.body;

    const currentTicketIndex = tickets.findIndex(t => t.id === id);
    if (currentTicketIndex === -1) throw new Error("Ticket Not Found");

    const oldStatus = tickets[currentTicketIndex].status;

    tickets[currentTicketIndex].status = newStatus;
    await saveTickets(tickets);

    await logAction(`STATUS UPDATED: ${oldStatus} -> ${newStatus}`, id);
    res.redirect('/tickets');
})
