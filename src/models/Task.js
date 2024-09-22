const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {type: String, required: true},
    status: {type: String, enum: ['pending', 'completed'], default: 'pending'},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);