import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/health or /health
 * Contract specification from SPEC-001
 */
router.get('/', (_req: Request, res: Response) => {
  const healthCheck = {
    status: 'ok',
    service: 'ono-pocket-api',
    app: 'Ono Pocket',
    version: process.env.APP_VERSION || '0.1.0',
    serverTime: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  };

  try {
    res.status(200).json(healthCheck);
  } catch (error) {
    res.status(503).json({
      status: 'error',
      service: 'ono-pocket-api',
      message: 'Health check failed',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
