import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import healthRouter from './routes/health.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(): Express {
  const app = express();

  const webOrigin = process.env.WEB_ORIGIN || 'http://localhost:3000';
  app.use(cors({ origin: webOrigin }));
  app.use(express.json());

  // Health check routes
  app.use('/health', healthRouter);
  app.use('/api/health', healthRouter);

  return app;
}

export async function setupStaticOrVite(app: Express) {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const clientDist = path.resolve(__dirname, '../client');
    app.use(express.static(clientDist));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  } else {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
        root: path.resolve(__dirname, '../client'),
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error('Vite dev middleware could not be loaded:', e);
    }
  }
}
