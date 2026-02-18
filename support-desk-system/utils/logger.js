const { timeStamp, log } = require('console');
const fs = require('fs');

const logAction = (action,  ticketId) => {
    const logs = JSON.parse(fs.readFileSync('./auditLogs.json', 'utf-8'));

    const newEntry = {
        timestamp: new Date().toISOString(),
        action: action,
        ticketId: ticketId
    };

    logs.push(newEntry);
    fs.writeFileSync('./auditLogs.json', JSON.stringify(logs, null, 2));
};

module.exports = logAction;