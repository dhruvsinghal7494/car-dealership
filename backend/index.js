import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import dealershipRoutes from "./routes/dealership.js";
import carRoutes from "./routes/car.js";
import dealRoutes from "./routes/deal.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
let db;

MongoClient.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    db = client.db();
    app.locals.db = db;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error(error));

app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/dealership", dealershipRoutes);
app.use("/car", carRoutes);
app.use("/deal", dealRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
