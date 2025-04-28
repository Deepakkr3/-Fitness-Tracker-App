import router from './routes/router';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from "path";




const app = express();



const staticDir: string = path.join(__dirname, './files');
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
  }

export default app;