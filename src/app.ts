import express from "express";
import { errorHandler } from './shared/error-handler.js';

import { authRouter } from './modules/auth/auth.routes.js';


import { NotFoundError } from './shared/errors.js';
import { ValidationError } from './shared/validate.js';
import { z } from 'zod';

export function buildApp() {
  const app = express();
  app.use(express.json());
   app.use('/auth', authRouter);

  app.get("/", (_req, res) => {
    res.send("ok");
  });

  app.get('/health', async (_request, reply) => {
  return reply.send({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });});

  // Temporary test routes — remove after verifying the error handler
app.get('/test/not-found', (_req, _res, next) => {
  next(new NotFoundError('Job not found'));
});

app.get('/test/validation', (_req, _res, next) => {
  const schema = z.object({ title: z.string().min(1) });
  const result = schema.safeParse({});
  if (!result.success) {
    next(new ValidationError(result.error));
  } else {
    next(new Error('Unexpected: schema should have failed'));
  }
});

app.get('/test/unhandled', (_req, _res, next) => {
  next(new Error('oops — raw error'));
});
 
  app.use(errorHandler);
  return app;
}