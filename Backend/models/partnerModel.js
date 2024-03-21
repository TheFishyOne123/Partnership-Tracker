import mongoose from 'mongoose'

// Partner Model

const partnersSchema = mongoose.Schema({
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

// Exporting For Use In Database

export const Partner = mongoose.model('Partner', partnersSchema)
