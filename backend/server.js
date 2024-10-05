
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic route for health check
app.get('/', (req, res) => {
    res.send('AI-NEXUS Backend is running!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Import necessary modules
const { Pool } = require('pg');
const pool = new Pool(); // Configure Pool to connect to PostgreSQL

// Task Management APIs
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, assignedTo, priority } = req.body;
        const result = await pool.query(
            'INSERT INTO tasks (title, description, assigned_to, priority) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, assignedTo, priority]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Risk Management APIs
app.post('/risks', async (req, res) => {
    try {
        const { title, description, level, owner, mitigationPlan } = req.body;
        const result = await pool.query(
            'INSERT INTO risks (title, description, level, owner, mitigation_plan) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, level, owner, mitigationPlan]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/risks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM risks');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
