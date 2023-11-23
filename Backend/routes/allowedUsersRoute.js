import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

// Create New User
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email
    ) {
      return response.status(400).send({
        message: 'Send all required fields: name, email',
      });
    }
    const newUser = {
      name: request.body.name,
      email: request.body.email,
    };

    const user = await User.create(newUser);

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get All Users
router.get('/', async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// // get user by name
// router.get('/:name', async (request, response) => {
//   try {
//     const { name } = request.params;

//     const user = await User.findById(name);

//     return response.status(200).json(user);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// Remove User
router.delete('/:name', async (request, response) => {
  try {
    const { name } = request.params;

    const result = await User.findByIdAndDelete(name);

    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User Removed successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;