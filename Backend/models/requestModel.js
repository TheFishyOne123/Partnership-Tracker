import mongoose from 'mongoose'

const requestsSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  pathway: {
    type: String,
    required: true
  },
  timeOfDay: {
    type: String,
    required: true
  },
  firstDayAvailable: {
    type: String,
    required: true
  },
  lastDayAvailable: {
    type: String,
    required: true
  }
})

export const Request = mongoose.model('Request', requestsSchema)
