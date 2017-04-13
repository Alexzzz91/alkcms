import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReservSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	price:{
		type: String
	},
	createdAt: {
		type:Date
	}
});

const Reserv = mongoose.model('Reserv', ReservSchema)