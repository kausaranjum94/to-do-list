const express = require("express");
const router = express.Router();
const task = require('../controller/taskController');

router.post('/', task.createTask );

router.get('/', task.getTasks );

router.put('/:id', task.updateTask );

router.delete('/:id', task.deleteTask );

module.exports = router;