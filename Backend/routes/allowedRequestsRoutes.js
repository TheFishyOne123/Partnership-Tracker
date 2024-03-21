// Imports
import express from 'express'
import { Request as RequestModel } from '../models/requestModel.js'

// Intializing Router Variable For Use In Routes
const router = express.Router()

// Get All Requests
router.get('/all', async (req, res) => {
  try {
    const requests = await RequestModel.find({})
    res.status(200).json({
      data: requests
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})

// Edit Row Data
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params
  console.log('Received Request To Update Request ID:', id)
  console.log('Received Request Data:', req.body)

  try {
    const updatedRequest = await RequestModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )

    console.log('Updated Request Data:', updatedRequest)

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request Data Not Found!' })
    }

    return res.sendStatus(200)
  } catch (error) {
    console.error('Error Handling Request Data!', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Create New Request
router.post('/create', async (req, res) => {
  try {
    const {
      companyName,
      position,
      owner,
      email,
      phone,
      pathway,
      timeOfDay,
      firstDayAvailable,
      lastDayAvailable
    } = req.body

    const newRecord = await RequestModel.create({
      companyName,
      position,
      owner,
      email,
      phone,
      pathway,
      timeOfDay,
      firstDayAvailable,
      lastDayAvailable
    })

    res.status(200).json(newRecord)
  } catch (error) {
    console.error('Error creating record:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//Find Request By ID
router.get('/searchByID', async (req, res) => {
  const searchValue = req.query.id

  try {
    const results = await RequestModel.findById(searchValue)
    res.json(results)
    console.log(results)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Delete A Partner
router.delete('/delete/:id', async (request, response) => {
  try {
    const { id } = request.params

    console.log('New Deletion Request!')
    console.log('Deletion ID: ', id)

    const partner = await RequestModel.findByIdAndDelete(id)

    if (!partner) {
      return response.status(404).json({ message: 'Request Not Found' })
    }
    return response.status(200).json({ message: 'Request Succesfully Deleted' })
  } catch (error) {
    console.log('Error: ', error)
    response
      .status(500)
      .json({ message: 'There Was A Error Deleting The Request' })
  }
})

// Exports Routes For Use In index.js
export default router
