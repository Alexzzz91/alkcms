import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestiesSchema = new Schema({
	name: {
		type: String
	},
	type: {
		type: String
	},
	description: {
		type: String
	},
	time: {
		type: String
	},
	image: {
		type: String
	},
	price: {
		type: String
	},
	price2: {
		type: String
	},
	difficulty_level: {
		type: String
	},
	createdAt: {
		type:Date
	}
});

const Questies = mongoose.model('Questies', QuestiesSchema)