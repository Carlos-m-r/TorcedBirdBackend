import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // nombre del modelo
    required: true
  },
  furniture: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Furniture', // nombre del modelo
    required: true
  }],
  invoiceNumber: {
    type: Number,
    unique: true,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;