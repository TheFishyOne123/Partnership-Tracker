import express from 'express';
import { Partner } from '../models/partnerModel.js';

const router = express.Router();

// Get All Partners
router.get('/all', async (req, res) => {
  try {
    const partners = await Partner.find({});
    res.status(200).json({
      data: partners,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Search Partners
router.get('/search', async (req, res) => {
  try {
    const search = req.query.search;
    const searchResults = await Partner.find({
      $or: [
        { companyName: { $regex: `^${search}`, $options: 'i' } },
        { position: { $regex: `^${search}`, $options: 'i' } },
        { owner: { $regex: `^${search}`, $options: 'i' } },
        { pathway: { $regex: `^${search}`, $options: 'i' } },
        { dayAvailable: { $regex: `^${search}`, $options: 'i' } },
      ],
    });
    res.json(searchResults);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/edit', async(req, res) => {
  try {
    await Partner.findByIdAndUpdate(req.query.name, req.body);
    res.status(200)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})



export default router;
