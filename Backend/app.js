const express = require('express');
const app = express();
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const short = require('shorthash');
const mongoose = require('mongoose');
const conn = require('./config/db');
const url = require('./schema/url');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const auth = require('./auth/config');

dotenv.config();

app.use(cors(
{origin: 'http://localhost:5173',  // your frontend URL
  credentials: true}
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
  }
}))
app.use(passport.session());
auth(passport);

app.use('/', routes);

const port = process.env.PORT || 3000;

app.get('/abc/:id', (req, res) => {
    res.json({ query: req.params.id });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
