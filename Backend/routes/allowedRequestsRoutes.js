import express, { request, response } from "express";
import { Request } from "../models/requestModel.js";

const router = express.Router();

// Get All Requests
router.get("/all", async (req, res) => {
  try {
    const requests = await request.find({});
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

    const newRecord = await Request.create({
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

export default router;
