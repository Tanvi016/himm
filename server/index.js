import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { readFile } from 'fs/promises';
import { createHmac, timingSafeEqual } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ── Load .env in development (no extra dependency needed) ───────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    });
}
const app = express();

// ── Environment ─────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '3001', 10);
const AUTH_PIN = process.env.AUTH_PIN;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
const IS_PROD = process.env.NODE_ENV === 'production';

if (!AUTH_PIN || !SESSION_SECRET) {
  console.error('❌  AUTH_PIN and SESSION_SECRET env vars are required.');
  process.exit(1);
}

// ── Asset map (opaque IDs → real files) ─────────────────────────────────────
const ASSET_MAP = {
  c1: { file: 'photos/c1.png', type: 'image/png' },
  c2: { file: 'photos/c2.png', type: 'image/png' },
  c3: { file: 'photos/c3.png', type: 'image/png' },
  p1: { file: 'photos/p1.jpg',   type: 'image/jpeg' },
  p2: { file: 'photos/p2.jpeg',  type: 'image/jpeg' },
  p3: { file: 'photos/p3.jpeg',  type: 'image/jpeg' },
  p4: { file: 'photos/p4.jpeg',  type: 'image/jpeg' },
  'p11.1': { file: 'photos/p11.1.jpeg', type: 'image/jpeg' },
  random: { file: 'photos/random.jpeg', type: 'image/jpeg' },
  s1: { file: 'music/s1.mp3',  type: 'audio/mpeg' },
  s2: { file: 'music/s2.mp3',  type: 'audio/mpeg' },
  s3: { file: 'music/s3.mp3',  type: 'audio/mpeg' },
  s4: { file: 'music/s4.mp3',  type: 'audio/mpeg' },
};

// ── Session helpers ─────────────────────────────────────────────────────────
function createSessionToken() {
  const ts = Date.now().toString();
  const sig = createHmac('sha256', SESSION_SECRET).update(ts).digest('hex');
  return `${ts}.${sig}`;
}

function verifySession(token) {
  if (!token || typeof token !== 'string') return false;
  const dot = token.indexOf('.');
  if (dot === -1) return false;

  const ts = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const age = Date.now() - parseInt(ts, 10);
  if (isNaN(age) || age < 0 || age > SESSION_MAX_AGE_MS) return false;

  const expected = createHmac('sha256', SESSION_SECRET).update(ts).digest('hex');
  try {
    return timingSafeEqual(Buffer.from(sig, 'utf8'), Buffer.from(expected, 'utf8'));
  } catch {
    return false;
  }
}

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cookieParser());
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: [
          "'self'",
          'data:',
          'https://www.transparenttextures.com',
          'https://media1.tenor.com',
        ],
        mediaSrc: ["'self'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false, // required for external images
  })
);

// ── Rate-limit auth endpoint (10 attempts / 15 min) ─────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts — try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── POST /api/auth ──────────────────────────────────────────────────────────
app.post('/api/auth', authLimiter, (req, res) => {
  const { pin } = req.body || {};

  if (!pin || String(pin) !== AUTH_PIN) {
    return res.status(401).json({ error: 'Invalid PIN' });
  }

  const token = createSessionToken();
  res.cookie('himm_session', token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE_MS,
    path: '/',
  });

  return res.json({ ok: true });
});

// ── GET /api/verify ─────────────────────────────────────────────────────────
app.get('/api/verify', (req, res) => {
  if (verifySession(req.cookies?.himm_session)) {
    return res.json({ authenticated: true });
  }
  return res.status(401).json({ authenticated: false });
});

// ── GET /api/media ──────────────────────────────────────────────────────────
app.get('/api/media', async (req, res) => {
  if (!verifySession(req.cookies?.himm_session)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const entry = req.query.id ? ASSET_MAP[req.query.id] : undefined;
  if (!entry) {
    return res.status(404).json({ error: 'Not found' });
  }

  const filePath = path.join(__dirname, '..', 'private', entry.file);
  try {
    const buf = await readFile(filePath);
    res.set({
      'Content-Type': entry.type,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    return res.send(buf);
  } catch {
    return res.status(404).json({ error: 'Asset not found on disk' });
  }
});

// ── Static files + SPA fallback (production only) ───────────────────────────
if (IS_PROD) {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('(.*)', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (${IS_PROD ? 'production' : 'development'})`);
});
