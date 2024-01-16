import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

// Get All Users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get Specific User In Database Route
router.get("/:user", async (request, response) => {
  try {
    const userToFind = request.query.user;
    const user = await User.findOne({ email: userToFind });
    if (!user) {
      return response.status(204).send();
    } else if (user) {
      response.status(200).json({
        data: user,
      });
    } else {
      response.status(501).send({ message: "Error Finding User" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete A User
router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;

    console.log("New Deletion Request!");
    console.log("Deletion ID: ", id);

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return response.status(404).json({ message: "User Not Found" });
    }
    return response.status(200).json({ message: "User Succesfully Deleted" });
  } catch (error) {
    console.log("Error: ", error);
    response
      .status(500)
      .json({ message: "There Was A Error Deleting The User" });
  }
});

// Create New Partner
router.post("/create", async (req, res) => {
  try {
    const { name, email, admin, newUser } = req.body;

    const newRecord = await User.create({
      name,
      email,
      admin,
      newUser,
    });

    res.status(200).json(newRecord);
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
