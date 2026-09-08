import express from "express";

export function buildApp() {
  const app = express();

  app.get("/", (_req, res) => {
    res.send("ok");
  });
  
  app.get('/health', async (_request, reply) => {
  return reply.send({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

  return app;
}