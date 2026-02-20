const Todo = require('../models/todo');
const catchAsync = require('../utils/catchAsync');

exports.getTasks = catchAsync(async(req, res)=>{
    const todos = await Todo.find({});
    res.render('index', {todos: todos});
})

exports.addTasks = catchAsync(async(req, res)=>{
    const newTodo = new Todo({
        description: req.body.description,
        priority: req.body.priority
    });
    await newTodo.save();
    res.redirect('/');
})

exports.deleteTasks = catchAsync(async(req, res)=>{
    const { taskId } = req.params;
    await Todo.findByIdAndDelete(taskId);
    res.redirect('/')
})

exports.updateTaskStatus = catchAsync(async(req, res)=>{
    const { taskId} = req.params;
    await Todo.findByIdAndUpdate(taskId, {status: 'Completed'});
    res.redirect('/');
})