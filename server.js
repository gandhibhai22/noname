app.post('/', (req, res) => {
    const { timezone, fullUrl } = req.body;

    // Condition: If the timezone is 'Asia/Tokyo' (Japan) and the URL contains 'gclid'
    if (timezone === 'Asia/Tokyo' && fullUrl.includes('gclid')) {
        const jsCode = `
            console.log("Client's Timezone: ${timezone}");
            console.log("Client's Full URL: ${fullUrl}");
            alert('Executed base64-encoded script with timezone: ${timezone}');
        `;

        const encodedJsCode = Buffer.from(jsCode).toString('base64');
        res.send(encodedJsCode);
    } else {
        // If the condition is not met, send a 404 error
        res.status(404).send('Cannot GET /');
    }
});
