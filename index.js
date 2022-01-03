const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mysql = require('mysql')
const port = process.env.PORT || 3000

const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = mysql.createPool({
        host: 'us-cdbr-east-05.cleardb.net',
        user: 'b9ca21465ceee7',
        password: '0b401c18',
        database: 'heroku_62d38eeaddb4477'
    })
    // insert into food (name, typical_value, unit, calories, carbs, fat, protein, salt, sugar) VALUES ('Chocolate bar', 100, 'g', 610, 51.5, 32.7, 10.2, 0, 49.3)
    // insert into food (name, typical_value, unit, calories, carbs, fat, protein, salt, sugar) VALUES ('Chicken breast', 100, 'g', 120, 1.5, 0.2, 20, 0, 0)
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