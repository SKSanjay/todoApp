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

    //get all todos between two dates (how to point to subobjects?)
    app.get('/api/todos/:startDate/:endDate', function (req, res) {

        // console.log(req.params.startDate);
        // console.log(req.params.endDate);
        var isoStartDate = new Date(req.params.startDate).toISOString();
        var isoEndDate = new Date(req.params.endDate).toISOString();

        Todo.find({'dateInformation.dateCreated':{$gte:new Date(req.params.startDate), $lte:new Date(req.params.endDate)}, function (err, todos) {
                if (err){
                    res.send(err);
                }

                res.json(todos); 
            }
        });
    });


    // create todo and send back all todos after creation
    app.post('/api/todos/:userInput/:todoTags/:difficulty', function (req, res) {

        //console.log(req);
        //console.log(req.body.userInput);
        console.log(req.params.userInput);
        console.log(req.params.todoTags);
        console.log(req.params.difficulty);

        var tags = req.params.todoTags.split(',');

        // create a todo, information comes from AJAX request from Angular
        Todo.create({text: req.params.userInput, tags: tags, difficulty: req.params.difficulty}, function (err, todo) {
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
    app.put('/api/todos/:todo_id/:completed', function(req, res) {
       var _id = req.params.todo_id;
       var completed = req.params.completed;
       var updateProperty = {$set: {completed:completed}};
        Todo.findByIdAndUpdate(_id, updateProperty,{new: true}, function (err, todo) {
            if (err){
                res.send(err);
                console.log("the complete went wrong for some reason");
            }  
            getTodos(res);
        });
    });

    //update todo
    app.put('/api/todos/:todo_id/:text/:difficulty/:completed', function(req, res) {
        //if (req) return handleError(req);
       var _id = req.params.todo_id;
       var text = req.params.text;
       var difficulty = req.params.difficulty;
       var completed = req.params.completed;
       var updateProperty = {$set: {text:text, difficulty:difficulty, completed:completed}};
        Todo.findByIdAndUpdate(_id, updateProperty,{new: true}, function (err, todo) {
            if (err){
                res.send(err);
                console.log("the update went wrong for some reason");
            }  
            getTodos(res);
        });
    });

};
