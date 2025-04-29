const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const todoRoutes = require('./routes/todos');
const authMiddleware = require('./middleware/auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    req.session.user = username;
    return res.redirect('/todos');
  }
  res.redirect('/login');
});

app.use('/todos', authMiddleware, todoRoutes);

module.exports = app;
