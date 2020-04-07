import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
})

export default mongoose.model("User", userSchema);