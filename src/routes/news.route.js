//código não entendido
//tentando
//código entendido//
import { Router } from "express"
const router = Router()

import { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews } from "../controllers/news.controller.js"
import { authmiddleware } from '../middlewares/auth.middlewaers.js'

router.post("/", authmiddleware, create)
router.get("/", findAll)
router.get("/top", topNews)
router.get("/search", searchByTitle)
router.get("/byUser", authmiddleware, byUser)
router.get("/:id", authmiddleware, findById)
router.patch("/:id", authmiddleware, update)
router.delete("/:id", authmiddleware, erase)
router.patch("/like/:id", authmiddleware, likeNews)

export default router