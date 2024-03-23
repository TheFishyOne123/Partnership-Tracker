// Imports
import mongoose from 'mongoose'

// User Model
const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  },
  newUser: {
    type: Boolean,
    required: true
  }
})

export const User = mongoose.model('User', usersSchema)
