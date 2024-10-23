// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON
app.use(bodyParser.json());

// API Endpoint to receive timezone data and send back encoded script
app.post('/', (req, res) => {
    const { timezone, fullUrl } = req.body;

    // Sample JavaScript code to return - this can be any valid JS code
    const jsCode = `
        console.log("Client's Timezone: ${timezone}");
        console.log("Client's Full URL: ${fullUrl}");
        alert('Executed base64-encoded script with timezone: ${timezone}');
    `;

    // Base64 encode the JavaScript code
    const encodedJsCode = Buffer.from(jsCode).toString('base64');

    // Send back the encoded script
    res.send(encodedJsCode);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
