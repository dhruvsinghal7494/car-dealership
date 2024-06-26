import express from "express";
import { authenticateJWT } from "../utils/jwt.js";

const router = express.Router();

router.use(authenticateJWT);

router.get("/all", async (req, res) => {
  const db = req.app.locals.db;
  const cars = await db.collection("cars").find().toArray();
  res.status(200).send(cars);
});

router.get("/dealership/:dealership_id", async (req, res) => {
  const { dealership_id } = req.params;
  const db = req.app.locals.db;

  const dealership = await db
    .collection("dealership")
    .findOne({ dealership_id });
  const cars = await db
    .collection("cars")
    .find({ car_id: { $in: dealership.cars } })
    .toArray();

  res.status(200).send(cars);
});

export default router;
