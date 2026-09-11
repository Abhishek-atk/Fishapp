import express from "express"
import {getAdminDashboard} from "./controller.js";

const router = express.Router()

router.get("/dashboard", getAdminDashboard);

export default router;