const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Timezone Check</title>
    </head>
    <body>
        <h1>Welcome to Website B</h1>
        <p>This server checks the timezone and URL parameters.</p>
    </body>
    </html>
    `);
});

// Endpoint to receive data from website A
app.post('/api/timezone', (req, res) => {
    const { timezone, fullUrl } = req.body;

    // Check if the timezone is Japan
    const isTimezoneJapan = timezone === 'Asia/Tokyo';

    // Check if the URL contains 'gclid'
    const containsGclid = fullUrl.includes('gclid');

    // If both conditions are met, respond with base64-encoded 'ABCD'
    if (isTimezoneJapan && containsGclid) {
        const responseMessage = Buffer.from('ABCD').toString('base64');
        console.log(`Response sent: ${responseMessage}`);
        res.send(responseMessage);
    } else {
        const responseMessage = 'Conditions not met.';
        console.log(responseMessage);
        res.send(responseMessage);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
