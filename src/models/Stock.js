import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StockSchema = new Schema({
	stock: {
		type: String
	},
	time_out: {
		type: String
	},
	text: {
		type: String
	},
	createdAt: {
		type:Date
	}
});

const Stock = mongoose.model('Stock', StockSchema)