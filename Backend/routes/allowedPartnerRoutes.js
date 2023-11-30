import express from 'express';
import { Partner } from '../models/partnerModel.js';

const router = express.Router();

// Get All Partners
router.get('/all', async (request, response) => {
  try {
    const partners = await Partner.find({});

    return response.status(200).json({
      data: partners,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;