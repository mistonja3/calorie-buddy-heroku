const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mysql = require('mysql')
const port = process.env.PORT || 3000

const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bba52950916ea5',
    password: 'b793f083',
    database: 'heroku_a397482da62fa3d'
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    cookie: { maxAge: null },
    resave: false,
    saveUninitialized: false
}))
app.use(function(req, res, next) {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.set('view engine', 'ejs')

//connect to database
db.connect((err) => {
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