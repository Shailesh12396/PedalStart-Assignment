const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/', async (req, res) => {
  const { title, description, date } = req.body;

  if (!title || !description || !date) {
    return res.status(400).json({ message: 'Please provide title, description, and date' });
  }
  try {
    const newTask = new Task({ title, description, date: new Date(date) });
    await newTask.save();
    res.status(201).json({ message: 'Successfully Created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Successfully Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (date) {
      task.date = new Date(date);
    }

    await task.save();
    res.status(200).json({ message: 'Successfully Updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
