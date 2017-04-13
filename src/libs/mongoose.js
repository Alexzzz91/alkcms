import mongoose from 'mongoose';

import config from '../etc/';


export function setUpConnection() {
	mongoose.connect(config.get('mongoose:url'), config.get("mongoose:options"))
}
