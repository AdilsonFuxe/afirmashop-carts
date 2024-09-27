import express from 'express';

import setupRoutes from '@src/adapters/http/express/routes'

const app = express();

app.use(express.json());

setupRoutes(app);

app.use((err, req, res, next) => {
  console.error('Erro no middleware:', err.message);
  res.status(500).send({error: "Internal server error"});
});

export default app;