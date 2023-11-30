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
        required:false,
      },
      typeOrg: {
        type: String,
        required: true,
      },
      }
  )

  export const Partner = mongoose.model('Partner', partnersSchema)