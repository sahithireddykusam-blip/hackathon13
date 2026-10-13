import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isDBConnected, getDatabaseStatus } from './db.js';

import authRoutes from './routes/auth.js';
import researchRoutes from './routes/research.js';
import documentsRoutes from './routes/documents.js';
import projectsRoutes from './routes/projects.js';
import reportsRoutes from './routes/reports.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/reports', reportsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDatabaseStatus();
  res.json({
    status: 'online',
    system: 'ResearchGenius AI',
    theme: 'Midnight Observatory',
    database: dbStatus.supabase,
    timestamp: new Date().toISOString()
  });
});

// Root route: Branded Midnight Observatory API Status Dashboard
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ResearchGenius AI — Backend API Status</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #101828;
      color: #F7F6F2;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .card {
      background: #172235;
      border: 1px solid #283548;
      border-radius: 20px;
      padding: 40px;
      max-width: 620px;
      width: 90%;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(54, 214, 197, 0.15);
      color: #36D6C5;
      border: 1px solid rgba(54, 214, 197, 0.3);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-family: monospace;
      margin-bottom: 20px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #36D6C5;
      box-shadow: 0 0 10px #36D6C5;
    }
    h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    h1 span { color: #36D6C5; }
    p {
      color: #94A3B8;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 24px 0;
    }
    .endpoints {
      background: #1D2939;
      border-radius: 12px;
      padding: 16px;
      text-align: left;
      font-family: monospace;
      font-size: 12px;
      margin-bottom: 24px;
      border: 1px solid #283548;
    }
    .endpoint-item {
      padding: 6px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      display: flex;
      justify-content: space-between;
    }
    .endpoint-item:last-child { border-bottom: none; }
    .method { color: #36D6C5; font-weight: bold; }
    .path { color: #E2E8F0; text-decoration: none; }
    .path:hover { text-decoration: underline; }
    .tag { color: #F5B942; }
    .btn {
      display: inline-block;
      background: #36D6C5;
      color: #101828;
      font-weight: 600;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 14px;
      transition: background 0.2s;
    }
    .btn:hover { background: #2bc2b2; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <span class="dot"></span>
      BACKEND API ONLINE & HEALTHY (PORT ${PORT})
    </div>
    <h1>Research<span>Genius</span> AI</h1>
    <p>Midnight Observatory Backend API is fully active and processing scholarly research queries, document embeddings, and knowledge topologies.</p>
    
    <div class="endpoints">
      <div class="endpoint-item">
        <span class="method">GET</span>
        <a class="path" href="/api/health">/api/health</a>
        <span class="tag">Online</span>
      </div>
      <div class="endpoint-item">
        <span class="method">GET</span>
        <a class="path" href="/api/documents">/api/documents</a>
        <span class="tag">Active</span>
      </div>
      <div class="endpoint-item">
        <span class="method">GET</span>
        <a class="path" href="/api/projects">/api/projects</a>
        <span class="tag">Active</span>
      </div>
      <div class="endpoint-item">
        <span class="method">GET</span>
        <a class="path" href="/api/reports">/api/reports</a>
        <span class="tag">Active</span>
      </div>
      <div class="endpoint-item">
        <span class="method">POST</span>
        <span class="path">/api/research/search</span>
        <span class="tag">Synthesis</span>
      </div>
    </div>

    <a href="http://localhost:5173" class="btn">Launch Frontend Web App &rarr;</a>
  </div>
</body>
</html>`);
});

// Start server
async function startServer() {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`ResearchGenius AI — Midnight Observatory Engine`);
    console.log(`Backend Server running on http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

startServer();
