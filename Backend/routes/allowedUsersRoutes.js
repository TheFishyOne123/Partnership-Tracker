// Imports

import express from 'express'
import { User } from '../models/userModel.js'

// Intializing Router Variable For Use In Routes

const router = express.Router()

// Get All Users

router.get('/all', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({
      data: users
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})

// Get Specific User In Database Route

router.get('/:email', async (request, response) => {
  try {
    const userToFind = request.params.email
    console.log('New User To Find', userToFind)

    const user = await User.findOne({ email: userToFind })

    if (user) {
      return response.status(200).json({
        data: user
      })
    } else {
      response.status(204).send()
    }
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Delete A User

router.delete('/delete/:email', async (request, response) => {
  try {
    const { email } = request.params

    console.log('New Deletion Request!')
    console.log('Deletion Email: ', email)

    const user = await User.findOneAndDelete({ email: email })

    if (!user) {
      return response.status(404).json({ message: 'User Not Found' })
    }
    return response.status(200).json({ message: 'User Succesfully Deleted' })
  } catch (error) {
    console.log('Error: ', error)
    response
      .status(500)
      .json({ message: 'There Was A Error Deleting The User' })
  }
})

// Create New User

router.post('/create', async (req, res) => {
  try {
    const { name, email, admin, newUser } = req.body

    const newRecord = await User.create({
      name,
      email,
      admin,
      newUser
    })

    res.status(200).json(newRecord)
  } catch (error) {
    console.error('Error creating record:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Edit Users

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User Data Not Found!' })
    }

    return res.sendStatus(200)
  } catch (error) {
    console.error('Error Handling User Data!', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Exports Router For Use In index.js

export default router
