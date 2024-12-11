const express = require('express');
const app = express();

// In-memory task list (can be replaced with a database later)
let tasks = [];

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, JS)
app.use(express.static('public'));

// Home route to display tasks
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve the HTML file
});

// Route to add a task
app.post('/add', (req, res) => {
    const taskName = req.body.task_name;
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
    }
    res.redirect('/');
});

// Route to mark a task as complete or incomplete
app.get('/update/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    tasks[taskId].completed = !tasks[taskId].completed;
    res.redirect('/');
});

// Route to delete a task
app.get('/delete/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    tasks.splice(taskId, 1); // Remove the task at the given index
    res.redirect('/');
});

// Start the server
app.listen(3000, () => {
    console.log('Task Management App is running on http://localhost:3000');
});
