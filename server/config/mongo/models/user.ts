import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	username: String,
	fullName: String,
	email: String,
	password: String
});

UserSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id;
		delete returnedObj._id;
		delete returnedObj.__v;
	}
});

const User = model('User', UserSchema);

export default User;
