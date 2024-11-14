const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dataLimit: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: 'No description provided',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;