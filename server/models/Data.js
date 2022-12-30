import mongoose from 'mongoose';

const { Schema } = mongoose;

const instanceSchema = new Schema({
    pos_x: {
        type: Number,
    },
    pos_y: {
        type: Number,
    },
    vel_x: {
        type: Number,
    },
    vel_y: {
        type: Number,
    },
    confidence: {
        type: Number,
    },
    sensors: {
        type: Array,
    },
});

const dataSchema = new Schema({
    timestamp: {
        type: String,
    },
    instances: {
        type: Map,
        of: instanceSchema,
    },
});

const Data = mongoose.model('data', dataSchema);
export default Data;
