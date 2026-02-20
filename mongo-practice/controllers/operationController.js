const Todo = require('../models/todo');

exports.getTasks = async(req, res)=>{
    try{
        const todos = await Todo.find({});
        res.render('index', {todos: todos});
    } catch (error) {
        res.status(500).send("Error fetching todos");
    }
}

exports.addTasks = async(req, res)=>{
    const newTodo = new Todo({
        description: req.body.description
    });
    try{
        await newTodo.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error adding Todos.");
    }
}

exports.deleteTasks = async(req, res)=>{
    const { taskId } = req.params;
    try {
        await Todo.findByIdAndDelete(taskId);
        res.redirect('/')
    } catch(error){
        res.status(500).send("Error deleting Todos.");
    }
}

exports.updateTaskStatus = async(req, res)=>{
    const { taskId} = req.params;
    try{
        await Todo.findByIdAndUpdate(taskId, {status: 'Completed'});
        res.redirect('/');
    } catch (error){
        res.status(500).send("Error updating Task Status");
    }
}

