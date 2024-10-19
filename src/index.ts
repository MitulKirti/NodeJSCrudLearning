import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },

]

app.get('/', (req, res) => {
    res.send('Hello from express demo,!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        //400 bad request
        res.status(400).send('Invalid name field, name should contain minimum three characters!');
    }
    const course = { id: courses.length + 1, name: req.body.name };
    courses.push(course);
    res.json({ message: 'Course created successfully', course });
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.findIndex(c => c.id === +(req.params.id)); //+is the fastest way to convert string to a number
    if (course == -1) res.status(404).send('Course not found!');
    courses.splice(course, 1);
    res.json({ message: 'User removed successfully', courses });
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('Course not found!');
    } else
        course.name = req.body.name;
    res.json({ message: 'course modified successfully' });
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found!');
    res.send(course);
});

app.listen(port, () => console.log(`Node app listening on port ${port}`));