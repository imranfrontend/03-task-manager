const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    const { description } = req.body;
    try {
        const task = new Task({ description, owner: req.user._id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all tasks for a logged in user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user._id});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

// update a task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { description, status } = req.body;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            { description, status },
            { new: true}
        );
        if(!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({error: 'Server error'})
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndDelete({  _id: id, owner: req.user._id});
        if(!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}