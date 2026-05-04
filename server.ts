import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route
  app.get('/api/gallery', async (req, res) => {
    try {
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET || 'LzarS09zBKRvsGhph9s4pQbwzEI';
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dejx0brol';

      if (apiKey && apiSecret) {
        const authHeader = 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
        
        // We will search for all images with the tag 'galeri'
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            expression: 'tags:galeri',
            with_field: 'tags',
            max_results: 50
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to fetch from Cloudinary Admin API');
        }

        const data = await response.json();
        return res.json(data);
      } else {
        // Fallback to client list if API keys are missing
        const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/galeri.json`);
        
        if (!response.ok) {
          return res.status(500).json({ error: 'MISSING_API_KEYS' });
        }
        
        const data = await response.json();
        return res.json({ resources: data.resources });
      }
    } catch (error: any) {
      console.error('Gallery fetch error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
