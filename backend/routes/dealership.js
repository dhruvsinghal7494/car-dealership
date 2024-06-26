import express from "express";
import { authenticateJWT } from "../utils/jwt.js";

const router = express.Router();

router.use(authenticateJWT);

router.post("/add-car", async (req, res) => {
  const db = req.app.locals.db;
  const dealershipId = req.user.id;
  const { car_id, car_info } = req.body;

  try {
    await db.collection("cars").insertOne({ car_id, car_info });
    await db
      .collection("dealership")
      .updateOne({ dealership_id: dealershipId }, { $push: { cars: car_id } });
    res.status(201).send("Car added");
  } catch (error) {
    res.status(500).send("Error adding car");
  }
});

router.post("/add-deal", async (req, res) => {
  const db = req.app.locals.db;
  const dealershipId = req.user.id;
  const { deal_id, car_id, deal_info } = req.body;

  try {
    await db.collection("deal").insertOne({ deal_id, car_id, deal_info });
    await db
      .collection("dealership")
      .updateOne(
        { dealership_id: dealershipId },
        { $push: { deals: deal_id } }
      );
    res.status(201).send("Deal added");
  } catch (error) {
    res.status(500).send("Error adding deal");
  }
});

router.get("/sold-vehicles", async (req, res) => {
  const db = req.app.locals.db;
  const dealershipId = req.user.id;

  const dealership = await db
    .collection("dealership")
    .findOne({ dealership_id: dealershipId });
  const soldVehicles = await db
    .collection("sold_vehicles")
    .find({ vehicle_id: { $in: dealership.sold_vehicles } })
    .toArray();

  res.status(200).send(soldVehicles);
});

export default router;
