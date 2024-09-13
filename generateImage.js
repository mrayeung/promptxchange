// pages/api/generateImage.js
import axios from 'axios';

export default async function handler(req, res) {
  const { positivePrompt, negativePrompt } = req.body;

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL,
      {
        positive_prompt: positivePrompt,
        negative_prompt: negativePrompt
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate image' });
  }
}
