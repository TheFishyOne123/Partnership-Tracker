 import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import allowedUsersRoute from './routes/allowedUsersRoutes.js'
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';


const app = express();


// Parses Request Body
app.use(express.json());

//Allow All Origins
app.use(cors());

app.use('/users', allowedUsersRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Partnership Tracker connected to database');
    app.listen(PORT, () => {
      console.log(`Partnership Tracker is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
