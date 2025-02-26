import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import githubRoutes from './routes/githubRoutes.js';
import tipRoutes from './routes/tipRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
dotenv.config();
const app = express();
// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: '000000000000',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to `true` for HTTPS
}));
// Serve static files
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
// Use the routes
app.use('/tip', tipRoutes);
app.use('/github', githubRoutes);
app.get('/logout', (req, res) => {
    res.redirect('/');
});
// Catch-all route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
