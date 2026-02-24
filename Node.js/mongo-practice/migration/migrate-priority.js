require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');
const Todo = require('../models/todo');

const migrateData = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const result = await Todo.updateMany(
            {priority: { $exists: false}},
            {$set : {priority: 'medium'}}
        );
    } catch (error){
        console.error(error);
    } finally {
        await mongoose.connection.close();
    }
}

migrateData();