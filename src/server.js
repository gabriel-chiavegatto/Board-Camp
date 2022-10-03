import express, {Router}  from 'express';
import dotenv from 'dotenv';
import router from './routes.js';
import cors from 'cors';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(router);

const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=>{console.log(`Hello Node, run in ${PORT}`)})