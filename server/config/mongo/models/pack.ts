import { model, Schema } from 'mongoose';

const PackSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	package: String,
	email: String,
	from: String,
	to: String,
	current: String,
	weight: Number,
	description: String,
	state: String,
	delivered: {
		type: Boolean,
		default: false
	},
	deliveredDate: {
		type: Date,
		default: null
	}
});

PackSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id;
		delete returnedObj._id;
		delete returnedObj.__v;
	}
});

const Pack = model('Pack', PackSchema);

export default Pack;
