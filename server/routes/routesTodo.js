var Todo = require('../models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

//I want to make this function although im not 100% this is the right way to write it
function getdateTodos(res){

    Todo.find({'dateInformation.dateCreated': {$gte: isoStartDate, $lte: isoEndDate}}, function (err, todos) {
        if (err) {
            res.send(err);
        }

        res.json(todos);
    });

};



module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    //get all todos between two dates (how to point to subobjects?)
    app.get('/api/todosDate/:startDate/:endDate', function (req, res) {

        console.log(req.params.startDate);
        console.log(req.params.endDate);
        var isoStartDate = new Date(req.params.startDate).toISOString();
        var isoEndDate = new Date(req.params.endDate).toISOString();

        Todo.find({
            'dateInformation.dateCreated': {
                $gte: isoStartDate,
                $lte: isoEndDate
            }
        }, function (err, todos) {
            
            if (err) {
                res.send(err);
            }

            res.json(todos);
        });

    });


    // create todo and send back all todos after creation
    app.post('/api/todos/', function (req, res) {

        console.log("Routes" + req);
        console.log("Routes" + req.body);

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            tags: req.body.tags,
            difficulty: req.body.difficulty
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    //complete todo
    app.put('/api/todos/:todo_id/:completed', function (req, res) {
        var _id = req.params.todo_id;
        var completed = req.params.completed;
        var dateCompleted = new Date();
        var updateProperty = {
            $set: {
                completed: completed,
                'dateInformation.dateCompleted': dateCompleted
            }
        };
        var dateCompleted = req.params.completed;
        Todo.findByIdAndUpdate(_id, updateProperty, {
            new: true
        }, function (err, todo) {
            if (err) {
                res.send(err);
                console.log("the complete went wrong for some reason");
            }
            getTodos(res);
        });
    });

    //update todo
    // app.put('/api/todos/', function (req, res) {
    //     //if (req) return handleError(req);
    //     var _id = req.params.todo_id;
    //     var text = req.params.text;
    //     var difficulty = req.params.difficulty;
    //     var completed = req.params.completed;
    //     var updateProperty = {
    //         $set: {
    //             text: text,
    //             difficulty: difficulty,
    //             completed: completed
    //         }
    //     };
    //     Todo.findByIdAndUpdate(_id, updateProperty, {
    //         new: true
    //     }, function (err, todo) {
    //         if (err) {
    //             res.send(err);
    //             console.log("the update went wrong for some reason");
    //         }
    //         getTodos(res);
    //     });
    // });

};