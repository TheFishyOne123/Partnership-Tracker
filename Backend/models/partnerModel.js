import mongoose from 'mongoose';

const partnersSchema = mongoose.Schema(
    {
      companyName: {
        type: String,
        required: true,
      },
      postion: {
        type: String,
        required: true,
      },
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
      dayAvailable: {
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