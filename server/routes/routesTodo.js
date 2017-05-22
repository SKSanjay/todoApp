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

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });



    //GET OR POST UNDER SAME ROUTE NOT WORKING??? FIND OUT
    // app.get('/api/todos/:text', function (req, res) {
    //     Todo.find({text:req.body.text},function (err, todos) {

    //     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    //     if (err) {
    //         res.send(err);
    //     }

    //     res.json(todos); // return all todos in JSON format
    //     });
        
    // });


    // create todo and send back all todos after creation
    app.post('/api/todos/:userInput/:todoTags/:difficulty', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            todoTags: req.body.todoTags,
            difficulty: req.body.difficulty,
            done: false
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

    app.put('/api/todos/:todo_id/:text/:difficulty', function(req, res) {
        //if (req) return handleError(req);
       var _id = req.params.todo_id;
       var text = req.params.text;
       var difficulty = req.params.difficulty;
       var updateProperty = {$set: {text:text, difficulty:difficulty}};
        Todo.findByIdAndUpdate(_id, updateProperty,{new: true}, function (err, todo) {
            if (err){
                res.send(err);
                console.log("the update went wrong for some reason");
            }  
            getTodos(res);
        });
    });

};
