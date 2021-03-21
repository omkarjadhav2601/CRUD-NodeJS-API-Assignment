const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
	_id: {type: Number, required: true },
	name: {type: String, required: true },
    img: {type: String, required: true },
    summary: String
}, {
    timestamps: true
}, { versionKey: '_somethingElse' });

module.exports = mongoose.model('Book', BookSchema);