import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const InfoSchema = new Schema({
	address: {
		type: String
	},
	number: {
		type: String
	},
	image: {
		type: String
	},
	text: {
		type: String
	},
	instagramm: {
		type: String
	},
	vk: {
		type: String
	},
	createdAt: {
		type:Date
	}
});

const Info = mongoose.model('Info', InfoSchema)