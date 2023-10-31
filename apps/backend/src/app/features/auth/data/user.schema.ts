import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Encrypt password before saving
UserSchema.pre('save', async function(next) {
  // eslint-disable-next-line
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 18);
  }
  next();
});

const UserModel = model('User', UserSchema);

export default UserModel;
