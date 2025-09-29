import express from "express";
import cors from "cors";
import { connectMongo } from "./config/mongoConnect.js";
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connections
connectMongo();

// Routes
app.use("/api/properties", propertyRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
