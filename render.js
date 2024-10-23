const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const { timezone, fullUrl } = req.body;

    // Condition: If the timezone is 'Asia/Tokyo' (Japan) and the URL contains 'gclid'
    if (timezone === 'Asia/Tokyo' && fullUrl.includes('gclid')) {
        // JavaScript code to send if the condition is met
        const jsCode = `
            console.log("Client's Timezone: ${timezone}");
            console.log("Client's Full URL: ${fullUrl}");
            alert('Executed base64-encoded script with timezone: ${timezone}');
        `;

        // Base64 encode the JavaScript code
        const encodedJsCode = Buffer.from(jsCode).toString('base64');

        // Send back the encoded script
        res.send(encodedJsCode);
    } else {
        // If the condition is not met, send no response or send an empty response
        res.status(204).send(); // 204 No Content status indicates no response
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
