require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const Todo = require('../models/todo');

const migrateData = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const result = await Todo.updateMany({
                $or: [
                    { dueDate: { $exists: false } },
                    { dueDate: null }]},
            {$set: {
                    dueDate: new Date(Date.now() + 7*24*60*60*1000)
                }
            });
    } catch (error){
        console.error(error);
    } finally {
        await mongoose.connection.close();
    }
}

migrateData();