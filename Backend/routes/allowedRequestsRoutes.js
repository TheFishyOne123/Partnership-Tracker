import express from "express";
import { Request as RequestModel } from "../models/requestModel.js";

const router = express.Router();

// Get All Requests
router.get("/all", async (req, res) => {
  try {
    const requests = await RequestModel.find({});
    res.status(200).json({
      data: requests,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Create New Request
router.post("/create", async (req, res) => {
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
      lastDayAvailable,
    } = req.body;

    const newRecord = await RequestModel.create({
      companyName,
      position,
      owner,
      email,
      phone,
      pathway,
      timeOfDay,
      firstDayAvailable,
      lastDayAvailable,
    });

    res.status(200).json(newRecord);
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Find Request By ID
router.get("/searchByID", async (req, res) => {
  const searchValue = req.query.id;

  try {
    const results = await RequestModel.findById(searchValue);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete A Partner
router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;

    console.log("New Deletion Request!");
    console.log("Deletion ID: ", id);

    const partner = await RequestModel.findByIdAndDelete(id);

    if (!partner) {
      return response.status(404).json({ message: "Request Not Found" });
    }
    return response
      .status(200)
      .json({ message: "Request Succesfully Deleted" });
  } catch (error) {
    console.log("Error: ", error);
    response
      .status(500)
      .json({ message: "There Was A Error Deleting The Request" });
  }
});

export default router;
