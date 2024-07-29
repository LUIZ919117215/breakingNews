//código não entendido
//tentando
//código entendido//
import { Router } from "express"
import userController from "../controllers/user.controller.js"
import { validId, validUser }  from "../middlewares/global.middlewares.js"

const router = Router()

router.post("/create", userController.create)//testada!!
router.get("/", userController.findAll)//testada!!
router.get("/:id",validId, validUser, userController.findById)//testada!!
router.patch("/:id",validId, validUser, userController.update)//testada!!

export default router