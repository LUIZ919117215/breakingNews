//código não entendido
//tentando
//código entendido//
import { Router } from "express"
const router = Router()

import { create, findAll, topNews } from "../controllers/news.controller.js"
import { authmiddleware } from '../middlewares/auth.middlewaers.js'

router.post("/", authmiddleware, create)
router.get("/", findAll)
router.get("/top", topNews)

export default router