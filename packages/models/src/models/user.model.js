import mongoose from 'mongoose';

export const UserSchema = mongoose.Schema({
  nickname: String,
  username: {
    type: String,
    select: false
  },
  password: {
    type: String,
    select: false
  }
}, { timestamps: true });


const UserModel = mongoose.model('User', UserSchema);
export default UserModel;