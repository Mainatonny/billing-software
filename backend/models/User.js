const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "guest" },
    dataUsage: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
    paymentStatus: { type: String, default: "unpaid"},

});

module.exports = mongoose.model('User', userSchema);