const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    description: {type:String, required:true},
    status: {type:String, default: 'pending'},
    priority: {type:String, default: 'medium', enum:['low', 'medium', 'high']},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Todo', todoSchema);