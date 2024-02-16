import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { ISRHandler } from '@rx-angular/isr';
import { environment } from '../common/src/environments/common-environment';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  const invalidateSecretToken = process.env['INVALIDATE_SECRET_TOKEN'] ?? 'MY_TOKEN';
  const isr = new ISRHandler({
    indexHtml,
    invalidateSecretToken: invalidateSecretToken,
    enableLogging: !environment.production,
    serverDistFolder,
    browserDistFolder,
    bootstrap,
    commonEngine,
  });

  // Add invalidation url handler
  server.use(express.json());
  server.post(
    '/api/invalidate',
    async (req, res) => {
      return await isr.invalidate(req, res);
    }
  );

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  server.get(
    '*',
    // Serve page if it exists in cache
    async (req, res, next) => {
      console.log("cache");
      return await isr.serveFromCache(req, res, next);
    },
    // Server side render the page and add to cache if needed
    async (req, res, next) => {
      console.log("render");
      return await isr.render(req, res, next, {
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl }, // <-- Needs to be provided when passing providers
        ],
      })
    }
  );

  return server;
}

function run(): void {
  const port = 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
