import express from "express";
import {
  getLocations,
  getProperties,
  getProperty,
  searchProperties,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/locations", getLocations);
router.get("/search", searchProperties);
router.get("/:id", getProperty);

export default router;
