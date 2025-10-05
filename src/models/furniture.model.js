// src/models/furniture.model.js
import mongoose from 'mongoose';

const furnitureSchema = new mongoose.Schema({
    reference: { type: String, unique: true, required: true },
    name: { type: String, unique: true },
    room: { type: String, required: true },
    type: { type: String, required: true },
    material: String,
    price: Number,
    color: String,
    measurement: { type: [Number], required: true },
    description: { type: String, required: true },
    image: String,
    active: Boolean,
    //TODO: promotion: String 
});

const Furniture = mongoose.model('Furniture', furnitureSchema);

export default Furniture;