import mongoose from 'mongoose';
import validUrl from 'valid-url';
import { ITEM_TYPES } from '../constants/item-type.js';

const itemSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [ITEM_TYPES.YOUTUBE, ITEM_TYPES.LINK],
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: url => !!validUrl.isUri(url),
            message: 'Invalid string format, you have to pass a url',
        }
    },
    name: {
        type: String,
        required: true,
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

export const Item = mongoose.model('Item', itemSchema);
