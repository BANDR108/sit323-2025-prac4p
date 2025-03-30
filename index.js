const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Utility function to validate inputs
function validateInputs(req, res, next) {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Both num1 and num2 must be valid numbers.' });
    }

    req.num1 = num1;
    req.num2 = num2;
    next();
}

// Routes
app.get('/add', validateInputs, (req, res) => {
    const result = req.num1 + req.num2;
    res.json({ result });
});

app.get('/subtract', validateInputs, (req, res) => {
    const result = req.num1 - req.num2;
    res.json({ result });
});

app.get('/multiply', validateInputs, (req, res) => {
    const result = req.num1 * req.num2;
    res.json({ result });
});

app.get('/divide', validateInputs, (req, res) => {
    if (req.num2 === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero.' });
    }
    const result = req.num1 / req.num2;
    res.json({ result });
});

// Start server
app.listen(port, () => {
    console.log(`Calculator microservice running at http://localhost:${port}`);
});
