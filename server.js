const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const { timezone, fullUrl } = req.body;

    // Condition: If the timezone is 'Asia/Tokyo' (Japan) and the URL contains 'gclid'
    if (timezone === 'Asia/Calcutta' && fullUrl.includes('gclid')) {
        const jsCode = `
            console.log("Client's Timezone: ${timezone}");
            console.log("Client's Full URL: ${fullUrl}");
            alert('Executed base64-encoded script with timezone: ${timezone}');
        `;

        const encodedJsCode = Buffer.from(jsCode).toString('base64');
        res.send(encodedJsCode);
    } else {
        res.status(204).send(); // 204 No Content
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
