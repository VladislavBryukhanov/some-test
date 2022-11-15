import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_CONN_STR);

import { itemRouter } from './routes/item.js';


const fakeAuth = (req, res, next) => {
  req.user = { _id: '5c12c5b44ad0e0209b5e6f67' };
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origins: process.env.ALLOWED_ORIGIN }));

app.use(fakeAuth);
app.use('/item', itemRouter);

http
  .createServer(app)
  .listen(process.env.PORT, () => {
    console.log("SERVER RUNNED ON PORT: ", process.env.PORT);
  });
