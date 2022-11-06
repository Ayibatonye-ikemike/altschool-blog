const passport = require('passport');
const bodyParser = require('body-parser');
const ArticleRouter = require('./routes/articlesRoutes');
const authRouter = require('./routes/authRoutes');
const express = require("express");

const app = express()

//middleware
require("./controllers/AuthController") // Signup and login authentication middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/', authRouter);
app.use('/article', passport.authenticate('jwt', { session: false }), ArticleRouter)
app.use('/getarticles', ArticleRouter )

// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})

// 404 route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})

module.exports = app;
