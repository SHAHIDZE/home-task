const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');

router.get('/', todoController.getTodos);
router.get('/new', (req, res) => {
  res.render('new');
});
router.post('/', todoController.createTodo);
router.get('/:id/edit', todoController.getEditTodo);
router.post('/:id/update', todoController.updateTodo);
router.post('/:id/delete', todoController.deleteTodo);

module.exports = router;
