const { timeStamp, log } = require('console');
const fs = require('fs').promises;

const logAction = async (action,  ticketId) => {
     let logs = [];
    const data = await fs.readFile('./auditLogs.json', 'utf-8');
    logs = JSON.parse(data);


    const newEntry = {
        timestamp: new Date().toISOString(),
        action: action,
        ticketId: ticketId
    };

    logs.push(newEntry);
    await fs.writeFile('./auditLogs.json', JSON.stringify(logs, null, 2));
};

module.exports = logAction;