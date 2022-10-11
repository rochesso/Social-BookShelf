import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true}
});

export default mongoose.model('user', usersSchema, 'users');