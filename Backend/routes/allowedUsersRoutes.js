import express from 'express';
import { User } from '../models/userModel.js';
import jsonwebtoken from 'jsonwebtoken'

const router = express.Router();
const secretKey = 'f57d53939545909862910eded5fbcc03';

// Get All Users In Database Route
router.get('/', async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.post('/login-attempt', (req, res) => {
   const loginData = req.body;
   console.log('Received login attempt:', loginData[0]);

   function GenerateToken() {
   const expirationTime = Math.floor(Date.now() / 1000) + 3600; // One hour expiration time
   const payload = { loginData, exp: expirationTime };
   return jsonwebtoken.sign(payload, secretKey);
   }
   
   const token = GenerateToken(loginData)
   const encodedToken = encodeURIComponent(token)
   res.json({ message: encodedToken });
 });

export default router;