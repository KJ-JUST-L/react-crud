const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3333;
app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: '1234',
    database: 'react_crud',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/', (req, res) => {
    res.send("Hello, Backend.")
});

app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    pool.execute(sql, (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const sql = 'SELECT * FROM users WHERE id = ?';

    pool.execute(sql, [userId], (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});

app.post('/api/users', (req, res) => {
    const { fullname, department, email } = req.body;

    if (!fullname || !department) {
        return res.status(400).json({ message: 'Full name and department are required' });
    }

    const sql = 'INSERT INTO users (fullname, department, email) VALUES (?, ?, ?)';
    const values = [fullname, department, !email ? '-' : email];

    pool.execute(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ code: 'SUCCESS', message: 'User added successfully', userId: results.insertId });
        }
    });
});

// Update user by ID
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { fullname, department, email } = req.body;

    if (!fullname || !department) {
        return res.status(400).json({ message: 'Full name and department are required' });
    }

    const sql = 'UPDATE users SET fullname=?, department=?, email=? WHERE id=?';
    const values = [fullname, department, !email ? '-' : email, userId];

    pool.execute(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ code: 'SUCCESS',message: 'User updated successfully', userId: userId });
        }
    });
});

// Delete user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    const sql = 'DELETE FROM users WHERE id=?';
    const values = [userId];

    pool.execute(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ code: 'SUCCESS', message: 'User deleted successfully', userId: userId });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});