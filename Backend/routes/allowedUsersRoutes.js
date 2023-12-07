import express, { request, response } from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

//Get Specfic User In Database Route
router.get('/:user', async (request,response) => {
  try {
    const userToFind = request.query.user;
    const user = await User.findOne({ email: userToFind });
    if (!user) {
      return response.status(404).send({ message: 'User Not Found' });
    } 

    else if (user) {
      response.status(200).json({
        data: user
      });
    }
    else {
      response.status(501).send({message: 'Error Finding User'})
    }

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})


export default router;