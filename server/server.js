const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://localhost/tasks-angular', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Db connection error:'));
db.once('open', function () {
    console.log('Db connected');
});

//Define schema
var ObjectId = mongoose.Schema.Types.ObjectId;
var taskSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    date: String,
    completed: Boolean
});
var Task = mongoose.model('Task', taskSchema);


//Configure expressjs
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;


//API REST methods

app.get('/api/get-tasks-by-day', (req, res) => {
    Task.find({ date: new Date(req.query.date).toISOString() })
        .then(function (tasks) {
            res.send(tasks);
        });
});

app.post('/api/add-task', (req, res) => {
    var task = new Task(req.body);
    task._id = mongoose.Types.ObjectId();
    task.date = (new Date(task.date)).toISOString();
    task.save();
    res.send({success : true});
});

app.get('/api/toggle-complete', (req, res) => {
    Task.findOne({ _id: req.query.id })
        .then(function (task) {
            task.completed = !task.completed;
            task.save();
            res.send({success : true});
        });
});




const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});