import { MONGODB_URL, PORT } from "./config/config";
import itemRoutes from './Routes/UserRoutes';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose")
const path = require("path")


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ "origin": "*" }));
app.use(express.static('public'));


mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () =>
      console.log(`Database Connected and Listening at Port ${PORT}`)
  )
}).catch((error: any) => {
  console.log("Database error :", error?.message);
})

app.use('/api', itemRoutes);