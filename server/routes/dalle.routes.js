import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const DEEPAI_API_KEY = "93c29540-1282-4455-807a-ad149b9f31f3";

        console.log("Sending request to DeepAI with prompt:", prompt);

        const response = await fetch("https://api.deepai.org/api/text2img", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Api-Key': DEEPAI_API_KEY
            },
            body: new URLSearchParams({ text: prompt }).toString()
        });

        // Log raw response for debugging
        const responseText = await response.text();
        console.log("DeepAI Raw Response:", responseText);

        try {
            const data = JSON.parse(responseText);
            console.log("DeepAI Parsed Response:", data);

            if (data.output_url) {
                // ... image download code ...
            } else {
                throw new Error(data.error || data.message || 'No image URL returned from DeepAI');
            }
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message || "Something went wrong"
        });
    }
});

export default router;