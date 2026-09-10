import express from "express"
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import authRoutes from "./modules/auth/routes.js";
dotenv.config();

const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
connectDB();


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running successfully",
  });
});
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
