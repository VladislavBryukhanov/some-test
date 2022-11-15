import express from 'express';
import { Item } from '../models/item.js';
import { handleError } from '../helpers/handleError.js';
import { ITEM_TYPES } from '../constants/item-type.js';
import mongoose from 'mongoose';
export const itemRouter = express.Router();

const DEFAULT_LIMIT = 20;
const YOUTUBE_DOMAIN = 'https://www.youtube.com';

itemRouter.get('/', async (req, res) => {
  try {
    const items = await Item.find().limit(DEFAULT_LIMIT);
    res.send({ items });
  } catch (err) {
    handleError(res, err);
  }
});
itemRouter.post('/', async (req, res) => {
  try {
    const { type, url, name } = req.body;

    if (!url?.includes(YOUTUBE_DOMAIN) && type === ITEM_TYPES.YOUTUBE) {
      return res.status(400).send('Invalid youtube link');
    }

    const item = await Item.create({ type, url, name, owner_id: req.user._id });
    res.status(201).send({ item });
  } catch (err) {
    handleError(res, err);
  }
});
itemRouter.delete('/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.id),
      owner_id: req.user._id,
    });
    res.sendStatus(200);
  } catch (err) {
    handleError(res, err);
  }
});
