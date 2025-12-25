
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'Messages Recieved' });

export default mongoose.model('Message', messageSchema);
