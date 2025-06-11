const Task = require("../model/taskModel.js");

const createTask = async (req, res) => {
    try{
        const newTask = new Task(req.body);
        console.log(newTask);
        await newTask.save();
        res.status(201).send(JSON.stringify(newTask));
    }catch(error){
        console.log("Failed to add task", error);
        res.status(500).json({error: error.message});
    }
}

const getTasks = async (req, res) => {
    try {
        const alltask = await Task.find();
        res.status(200).json(alltask);
    } catch(error){
        res.status(500).render('error', {message: "Internal Server Error"});
    }
}

const updateTask = async (req, res) => {
    try{
        const task_id = req.params.id; 

        const updatedTask = await Task.findByIdAndUpdate(task_id, req.body, {new: true});
        console.log("Updated Task",updatedTask);
        if(!updatedTask){
            res.status(500).json("error", {message: "Task Not Found"})
        }

        res.status(200).json(updatedTask)

    }catch(error){
        res.status(500).json('error', {message: "Error updating task"})
    }
}

const deleteTask = async (req, res) => {
    try{
        const task_id = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(task_id );

        if(!deletedTask){
            res.status(500).json({message: "Faild to find Task"})
        }
        res.status(200).json({message: "Task deleted successfully"});

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {createTask, getTasks, updateTask, deleteTask};