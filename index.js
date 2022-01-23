const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mysql = require('mysql')
const port = process.env.PORT || 3000
const dotenv = require('dotenv')
dotenv.config({path: "./.env"})
const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
})
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: null
    },
    resave: false,
    saveUninitialized: false
}))

app.use(function (req, res, next) {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.set('view engine', 'ejs')

//connect to database
db.getConnection((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database");
    }
});

global.db = db;

require("./routes/main")(app);
//using static files like images and stylesheets
app.use('/assets', express.static('assets'));
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

app.listen(port, () => console.log(`Server up on port ${port}`))