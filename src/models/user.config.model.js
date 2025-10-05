import mongoose from 'mongoose';

const userConfigSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // nombre del modelo User
    required: true
  },
  settings: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserConfig = mongoose.model('UserConfig', userConfigSchema);

export default UserConfig;
