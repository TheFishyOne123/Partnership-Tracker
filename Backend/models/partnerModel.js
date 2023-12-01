import mongoose from 'mongoose';

const partnersSchema = mongoose.Schema(
    {
      owner: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required:true,
      },
      pathway: {
        type: String,
        required: true,
      },
      timeAvailable: {
        type: String,
        required: true,
      },
      beginningAvailable: {
        type: String,
        required: true,
      },
      endingAvailable: {
        type: String,
        required: true,
      }
      }
  )

  export const Partner = mongoose.model('Partner', partnersSchema)