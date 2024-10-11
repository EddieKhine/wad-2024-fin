// models/Customer.js
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
