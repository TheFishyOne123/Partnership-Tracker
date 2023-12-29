import express from "express";
import { Partner } from "../models/partnerModel.js";

const router = express.Router();

// Get All Partners
router.get("/all", async (req, res) => {
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
router.get("/search", async (req, res) => {
  try {
    const search = req.query.search;
    const searchResults = await Partner.find({
      $or: [
        { companyName: { $regex: `^${search}`, $options: "i" } },
        { position: { $regex: `^${search}`, $options: "i" } },
        { owner: { $regex: `^${search}`, $options: "i" } },
        { pathway: { $regex: `^${search}`, $options: "i" } },
        { dayAvailable: { $regex: `^${search}`, $options: "i" } },
      ],
    });
    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Search For Row By Id
router.get("/searchByID", async (req, res) => {
  const searchValue = req.query.id;

  try {
    const results = await Partner.findById(searchValue);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

// Edit Row Data
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received Request To Update ID:", id);
  console.log("Received Partner Data:", req.body);

  try {
    const updatedPartner = await Partner.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    console.log("Updated Partner Data:", updatedPartner);

    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner Data Not Found!" });
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error Handling Partner Data!", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
