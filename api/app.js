// api/generate-image.js (updated)
const fetch = require('node-fetch'); 

process.env.MODELSLAB_API_KEY = '1VX350mf89gm053hnEyAlnwRtUg14LPmbL36phk6kYCk6auQKpQSt0WrhKcO';

export default async function handler(req, res) {
    const { positivePrompt, negativePrompt } = req.body;

    try {
        const response = await fetch('https://modelslab.com/api/v1/text2img', { // Replace with the actual ModelsLab API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.MODELSLAB_API_KEY}`, // Assuming ModelsLab uses Bearer token authentication
            },
            body: JSON.stringify({
                prompt: positivePrompt,
                negative_prompt: negativePrompt,
                // Add other parameters as needed based on ModelsLab's API documentation
            })
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data); // Return the entire response from ModelsLab
        } else {
            console.error('Error from ModelsLab API:', response.statusText);
            res.status(500).send('Error generating image');
        }

    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).send('Error generating image');
    }
}