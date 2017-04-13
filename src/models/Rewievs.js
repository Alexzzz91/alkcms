import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RewievsSchema = new Schema({
	author: {
		type: String,
		required: true
	},
	rewiev: {
		type: String
	},
	rating: {
		type: String
	},
	createdAt: {
		type:Date
	}
});

const Rewievs = mongoose.model('Rewievs', RewievsSchema)