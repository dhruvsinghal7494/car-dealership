import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { addInvalidatedToken } from "./jwt.js";

const register = async (req, res) => {
  const { email, password, role } = req.body;
  const db = req.app.locals.db;

  if (!email || !password || !role) {
    return res.status(400).send("All fields are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let userData;
  if (role === "user") {
    userData = {
      user_email: email,
      user_id: uuidv4(),
      user_location: "",
      user_info: {},
      password: hashedPassword,
      vehicle_info: [],
    };
  } else if (role === "dealership") {
    userData = {
      dealership_email: email,
      dealership_id: uuidv4(),
      dealership_name: "",
      dealership_location: "",
      password: hashedPassword,
      dealership_info: {},
      cars: [],
      deals: [],
      sold_vehicles: [],
    };
  } else {
    return res.status(400).send("Invalid role");
  }

  try {
    const collection = role === "user" ? "user" : "dealership";
    const result = await db.collection(collection).insertOne(userData);
    res.status(201).send(result.ops[0]);
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;
  const db = req.app.locals.db;

  if (!email || !password || !role) {
    return res.status(400).send("All fields are required");
  }

  const collection = role === "user" ? "user" : "dealership";
  const user = await db
    .collection(collection)
    .findOne({ [`${role}_email`]: email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user[`${role}_id`], role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).send({ token });
};

const logout = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  await addInvalidatedToken(token);
  res.status(200).send("Logged out");
};

export { register, login, logout };
