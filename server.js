import express from 'express'

import { Liquid } from 'liquidjs';

import dotenv from "dotenv";

dotenv.config();

const app = express()

  const response = await fetch ('https://the-sprint-api.onrender.com/people')

  app.use(
  "/api",
  createProxyMiddleware({
    target: "https://the-sprint-api.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.removeHeader("x-api-key");
      proxyReq.setHeader("x-api-key", process.env.API_KEY);
    },
  })
);
  console.log(response)

app.set('port', process.env.PORT || 7000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})