// pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [positivePrompt, setPositivePrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateImage = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/generateImage', {
        positivePrompt,
        negativePrompt
      });

      setImageUrl(response.data.image_url);
    } catch (err) {
      setError('Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Text2Image Generator</h1>
      <textarea
        placeholder="Enter positive prompt"
        value={positivePrompt}
        onChange={(e) => setPositivePrompt(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <textarea
        placeholder="Enter negative prompt"
        value={negativePrompt}
        onChange={(e) => setNegativePrompt(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleGenerateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated Image" style={{ marginTop: '20px', maxWidth: '100%' }} />}
    </div>
  );
}
