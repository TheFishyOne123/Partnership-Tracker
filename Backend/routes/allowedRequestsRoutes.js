import express, { request, response } from "express";
import { Request } from "../models/requestModel.js";

const router = express.Router();

// Get All Partners
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

export default router;
