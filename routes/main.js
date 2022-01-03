module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index", { title: "CalorieBuddy - Home Page" })
    });
    app.get("/about", function(req, res) {
        res.render("about", { title: "About Page" })
    });
    app.get("/add-food", function(req, res) {
        res.render("add-food", { title: "Add Food" })
    });
    app.get("/update-food", function(req, res) {
        res.render("update-food", { title: "Update Food", food: {}, text: "Search and Update The Food List" })
    });
    app.get("/search-food", function(req, res) {
        res.render("search-food", { title: "Search Food", text: "Search Your Favorite Food" })
    });
    app.get("/list-food", function(req, res) {
        // query database to get all the books
        let sqlquery = "SELECT * FROM food ORDER BY name";
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) throw err;

            res.render("list-food", { title: "Food List", text: "CalorieBuddy's Food List", availableFood: result });
        });
    });
    app.post("/added-food", function(req, res) {
        if (req.body.name == "" ||
            req.body.typical_value == "" ||
            req.body.unit == "" ||
            req.body.calories == "" ||
            req.body.carbs == "" ||
            req.body.fat == "" ||
            req.body.protein == "" ||
            req.body.salt == "" ||
            req.body.sugar == "") {
            req.session.message = {
                type: 'error',
                message: 'Error. Please make sure to fill in all the fields'
            }
            res.redirect('add-food');
        } else {
            // saving data in database
            let sqlquery = "INSERT INTO food (name, typical_value, unit, calories, carbs, fat, protein, salt, sugar) VALUES (?,?,?,?,?,?,?,?,?)";
            // execute sql query
            let newrecord = [
                req.body.name,
                req.body.typical_value,
                req.body.unit,
                req.body.calories,
                req.body.carbs,
                req.body.fat,
                req.body.protein,
                req.body.salt,
                req.body.sugar
            ];
            db.query(sqlquery, newrecord, (err, result) => {
                if (err)
                //res.send(" Error. Please enter all the fields with correct data.<br> <a href='/add-food'>Go back</a>" );
                    return console.error(err.message);
            })
            req.session.message = {
                type: 'success',
                message: 'Successfully added `' + req.body.name + '` to the food list.'
            }
            res.redirect('add-food')
                //res.send(" Succesfully added '" + req.body.name + "' to the food list.<br> <a href='/list-food'> See all food</a>" );
        }
    });


    app.get("/update-result", function(req, res) {

        //searching in the database
        let word = ["%" + req.query.keyword + "%"];
        let sqlquery = "SELECT * FROM `food` WHERE name LIKE ? ";
        // execute sql query
        db.query(sqlquery, word, (err, result) => {
            if (err) {
                return console.error("No food found with the keyword you have entered " + req.query.keyword + " error: " + err.message);
            } else {
                if (result.length == 0) {
                    req.session.message = {
                        type: 'error',
                        message: "Sorry, couldn't find anything with name `" + req.query.keyword + "`"
                    }
                    res.redirect('update-food');

                } else {
                    res.render('update-result', { title: "Update Food", availableFood: result, text: "Start Editing Your Favorite Food" });
                }
            }
        });
    });

    app.get("/edit-food", function(req, res) {
        let sqlquery = "SELECT * FROM food WHERE id = ? ";
        db.query(sqlquery, req.query.id, (err, result) => {
            res.render('edit-food', { title: "Edit Food", food: result[0] });
        });
    });

    app.post("/edit-food", function(req, res) {
        if (req.body.name == "" ||
            req.body.typical_value == "" ||
            req.body.unit == "" ||
            req.body.calories == "" ||
            req.body.carbs == "" ||
            req.body.fat == "" ||
            req.body.protein == "" ||
            req.body.salt == "" ||
            req.body.sugar == "") {
            req.session.message = {
                type: 'error',
                message: 'Error. Please make sure to fill in all the fields'
            }
            res.redirect('back');
        } else {
            let sqlquery = "UPDATE food SET ? WHERE id = ? ";
            var newRecords = [
                req.body,
                req.query.id
            ]
            db.query(sqlquery, newRecords, (err, result) => {
                res.redirect('list-food')
            });
        }
    });

    app.get("/delete-result", function(req, res) {
        let sqlquery = "DELETE FROM food WHERE id =  ? ";
        db.query(sqlquery, req.query.id, (err, result) => {
            if (err) return console.error();
            else {
                req.session.message = {
                    type: 'success',
                    message: "Successfully deleted food item"
                }
                res.redirect('list-food');
            }
        });
    });

    app.get("/search-result", function(req, res) {
        //searching in the database
        let word = ["%" + req.query.keyword + "%"];
        let sqlquery = "SELECT * FROM food WHERE name LIKE ? ORDER BY name";
        // execute sql query
        db.query(sqlquery, word, (err, result) => {
            if (err)
                return console.error("No food found with the keyword you have entered " + req.query.keyword + " error: " + err.message);
            else {
                if (result.length == 0) {
                    req.session.message = {
                        type: 'error',
                        message: "Sorry, couldn't find anything with name `" + req.query.keyword + "`"
                    }
                    res.redirect('search-food');
                } else
                    res.render('list-food', { title: "Food List", text: "Your Search Result For: " + req.query.keyword, availableFood: result });
            }
        });
    });
}