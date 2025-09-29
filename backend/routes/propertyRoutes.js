import express from "express";
import {
  getLocations,
  getProperties,
  searchProperties,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/locations", getLocations);
router.get("/search", searchProperties);

export default router;
