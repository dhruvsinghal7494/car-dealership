import express from "express";
import { authenticateJWT } from "../utils/jwt.js";

const router = express.Router();

router.use(authenticateJWT);

router.get("/dealerships", async (req, res) => {
  const { car_id } = req.query;
  const db = req.app.locals.db;

  const dealerships = await db
    .collection("dealership")
    .find({ cars: car_id })
    .toArray();
  res.status(200).send(dealerships);
});

router.get("/vehicles", async (req, res) => {
  const db = req.app.locals.db;
  const userId = req.user.id;

  const user = await db.collection("user").findOne({ user_id: userId });
  const vehicles = await db
    .collection("sold_vehicles")
    .find({ vehicle_id: { $in: user.vehicle_info } })
    .toArray();

  res.status(200).send(vehicles);
});

router.get("/deals", async (req, res) => {
  const { car_id } = req.query;
  const db = req.app.locals.db;

  const deals = await db.collection("deal").find({ car_id }).toArray();
  res.status(200).send(deals);
});

export default router;
