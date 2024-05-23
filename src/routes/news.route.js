import { Router } from "express"
const router = Router()

import { create, findAll } from "../controllers/news.controller.js"
import { authmiddleware } from '../middlewares/auth.middlewaers.js';

router.post("/", authmiddleware, create)
router.get("/", findAll)

export default router