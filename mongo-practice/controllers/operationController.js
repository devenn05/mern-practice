const Todo = require('../models/todo');
const catchAsync = require('../utils/catchAsync');

exports.getTasks = catchAsync(async(req, res, next)=>{
    const filter = {};
    if (req.query.priority){
        filter.priority = req.query.priority;
    }
    if (req.query.status){
        filter.status = req.query.status;
    }
    let sortQuery = {}
    if (req.query.sort === 'oldest'){
        sortQuery = {createdAt: 1};
    } else {
        sortQuery = {createdAt: -1};
    }
    const todos = await Todo.find(filter).sort(sortQuery);
    res.render('index', {
        todos: todos,
        currentPriority: req.query.priority,
        currentStatus: req.query.status,
        currentSort: req.query.sort
    });
})

exports.addTasks = catchAsync(async(req, res, next)=>{
    const newTodo = new Todo({
        description: req.body.description,
        priority: req.body.priority
    });
    await newTodo.save();
    res.redirect('/');
})

exports.deleteTasks = catchAsync(async(req, res, next)=>{
    const { taskId } = req.params;
    await Todo.findByIdAndDelete(taskId);
    res.redirect('/')
})

exports.updateTaskStatus = catchAsync(async(req, res, next)=>{
    const { taskId} = req.params;
    const task = await Todo.findById(taskId);
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    await Todo.findByIdAndUpdate(taskId, {status: newStatus});
    res.redirect('/');
})

exports.updateButton = catchAsync(async(req, res, next)=>{
    const {taskId} = req.params;
    const task = await Todo.findById(taskId)
    res.render('updateTask', {task: task});
})

exports.updateWholeTask = catchAsync(async(req, res, next)=>{
    const {taskId} = req.params;
    let task = await Todo.findById(taskId);
    task.description = req.body.description;
    task.priority = req.body.priority;
    task.status = req.body.status;
    await task.save();
    res.redirect('/');
})