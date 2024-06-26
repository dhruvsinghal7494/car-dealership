import express from "express";
import { authenticateJWT } from "../utils/jwt.js";

const router = express.Router();

router.use(authenticateJWT);

router.get("/dealership/:dealership_id", async (req, res) => {
  const { dealership_id } = req.params;
  const db = req.app.locals.db;

  const dealership = await db
    .collection("dealership")
    .findOne({ dealership_id });
  const deals = await db
    .collection("deal")
    .find({ deal_id: { $in: dealership.deals } })
    .toArray();

  res.status(200).send(deals);
});

export default router;
