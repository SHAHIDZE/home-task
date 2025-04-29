const fs = require('fs');
const dbPath = 'db.json';

const loadTodos = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const saveTodos = (todos) => fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2));

module.exports = {
  getTodos: (req, res) => {
    const todos = loadTodos();
    const { isComplete } = req.query;
    const filtered = isComplete !== undefined ? todos.filter(t => String(t.is_complete) === isComplete) : todos;
    res.render('index', { todos: filtered });
  },

  createTodo: (req, res) => {
    const todos = loadTodos();
    const { todo_title, todo_desc } = req.body;
    const newTodo = {
      id: Date.now().toString(),
      todo_title,
      todo_desc,
      is_complete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    todos.push(newTodo);
    saveTodos(todos);
    res.redirect('/todos');
  },

  getEditTodo: (req, res) => {
    const todos = loadTodos();
    const todo = todos.find(t => t.id === req.params.id);
    if (!todo) return res.sendStatus(404);
    res.render('edit', { todo });
  },

  updateTodo: (req, res) => {
    const todos = loadTodos();
    const index = todos.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.sendStatus(404);
    todos[index] = {
      ...todos[index],
      todo_title: req.body.todo_title,
      todo_desc: req.body.todo_desc,
      is_complete: req.body.is_complete === 'on',
      updatedAt: new Date()
    };
    saveTodos(todos);
    res.redirect('/todos');
  },

  deleteTodo: (req, res) => {
    let todos = loadTodos();
    todos = todos.filter(t => t.id !== req.params.id);
    saveTodos(todos);
    res.redirect('/todos');
  }
};
