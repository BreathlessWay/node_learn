import mongoose from './mongo';

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    default: '',
    required: true
  },
  password: {
    type: String,
    default: '',
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  gender:{
    type:String
  }
});