import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Body parsing for JSON and file uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Helper to obtain Gemini client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured in the environment.');
    }
    return {
      ai: new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      }),
      apiKey,
    };
  };

  // POST /api/generate-video - Start Veo video generation from uploaded photo
  app.post('/api/generate-video', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', prompt = '', aspectRatio = '16:9' } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: 'imageBase64 is required to animate an image into video.' });
      }

      // Valid aspect ratio check
      const validAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

      const { ai } = getAiClient();

      // Clean base64 string if data URL prefix was supplied
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

      // Model requested by feature requirement: veo-3.1-fast-generate-preview or fallback to standard Veo
      const model = 'veo-3.1-fast-generate-preview';

      const videoPrompt = prompt.trim() || 'Cinematic smooth motion animating this photo into life, subtle camera movement, highly realistic and inspirational SENA institutional style';

      const operation = await ai.models.generateVideos({
        model,
        prompt: videoPrompt,
        image: {
          imageBytes: cleanBase64,
          mimeType: mimeType || 'image/jpeg',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: validAspectRatio,
        },
      });

      console.log('Video generation started:', operation.name);
      return res.json({
        operationName: operation.name,
        aspectRatio: validAspectRatio,
        prompt: videoPrompt,
      });
    } catch (error: any) {
      console.error('Error in /api/generate-video:', error);
      return res.status(500).json({
        error: error.message || 'Failed to start video generation',
      });
    }
  });

  // POST /api/video-status - Poll video generation operation status
  app.post('/api/video-status', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      const { ai } = getAiClient();
      const op = new GenerateVideosOperation();
      op.name = operationName;

      const updated = await ai.operations.getVideosOperation({ operation: op });
      const done = Boolean(updated.done);
      const hasError = Boolean(updated.error);

      return res.json({
        done,
        error: updated.error || null,
        hasError,
      });
    } catch (error: any) {
      console.error('Error in /api/video-status:', error);
      return res.status(500).json({
        error: error.message || 'Failed to check video status',
      });
    }
  });

  // POST /api/video-download - Download and stream the generated MP4
  app.post('/api/video-download', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: 'operationName is required' });
      }

      const { ai, apiKey } = getAiClient();
      const op = new GenerateVideosOperation();
      op.name = operationName;

      const updated = await ai.operations.getVideosOperation({ operation: op });

      if (!updated.done) {
        return res.status(400).json({ error: 'Video generation is not complete yet' });
      }

      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
      if (!uri) {
        return res.status(404).json({ error: 'No video URI found in completed operation' });
      }

      const videoRes = await fetch(uri, {
        headers: { 'x-goog-api-key': apiKey },
      });

      if (!videoRes.ok) {
        return res.status(videoRes.status).json({ error: 'Failed to fetch video stream from Google' });
      }

      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', 'inline; filename="sena-video-animado.mp4"');

      // Pipe Web Stream to Express Response
      const arrayBuffer = await videoRes.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (error: any) {
      console.error('Error in /api/video-download:', error);
      return res.status(500).json({
        error: error.message || 'Failed to download generated video',
      });
    }
  });

  // Serve static assets from public
  app.use(express.static('public'));

  // Vite middlewares for frontend development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
