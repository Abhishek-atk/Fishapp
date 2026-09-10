import express from "express"

import { login } from "./controller.js"
import authMiddleware from "../../middleware/authMiddleware.js"

const router = express.Router()


router.post("/login", authMiddleware, login);

export default router;