import mongoose from "mongoose";

import { config } from '../config'

(async () => {
  try {
    const db = await mongoose.connect(config.MONGO_DATABASE);
    console.log("Database is connected to: ", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})()