// Imports
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import allowedUsersRoutes from "./routes/allowedUsersRoutes.js";
import allowedPartnerRoutes from "./routes/allowedPartnerRoutes.js";
import allowedRequestsRoutes from "./routes/allowedRequestsRoutes.js";
import cors from "cors";

// Base For Using Express
const app = express();

// Parses Request Body
app.use(express.json());

//Allow All Origins
app.use(cors());

// Allowed Routes
app.use("/users", allowedUsersRoutes);
app.use("/partners", allowedPartnerRoutes);
app.use("/requests", allowedRequestsRoutes);

//Database connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Partnership Tracker connected to database");
    app.listen(PORT, () => {
      console.log(`Partnership Tracker is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
