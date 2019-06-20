import express from 'express';
import todos from "../db/db";
import bodyParser from 'body-parser';
const app = express();

app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let listenPort = process.env.PORT || 3000;

app.listen(listenPort, () => {
    console.log('Express server running at port: ' + listenPort)
});
app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/v1/todos', (req, res) => {
    res.send(200).send(todos.toString())
})

app.post('/v1/todos', (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        description: req.body.description
    }
    todos.push(todo);
    return res.status(201).send({
        message: 'todo added successfully',
        todo
    })
})


app.get('/v1/todos/:id', (req, res) => {

    const id = parseInt(req.params.id, 10);
    todos.map((todo) => {

        if (todo.id === id) {
            return res.status(200).send({
                message: 'todo retrieved successfully',
                todo,
            });
        }
    });
    return res.status(404).send({
        message: 'todo does not exist',
    });
})

app.delete('/v1/todos/:id', (req, res) => {

    const id = parseInt(req.params.id, 10);
    todos.map((todo, index) => {
        if (todo.id === id) {
            todos.splice(index, 1);
            return res.status(200).send({
                message: 'Todo deleted successfuly',
            });
        }
    });

    return res.status(404).send({
        message: 'todo not found',
    });
})
