//código não entendido
//tentando
//código entendido//
import { Router } from "express"
import userController from "../controllers/user.controller.js"
import { validId, validUser }  from "../middlewares/global.middlewares.js"
import { authmiddleware } from "../middlewares/auth.middlewaers.js"

const router = Router()

router.post("/create", userController.create)//testada!!

router.use(authmiddleware)
router.get("/", userController.findAll)//testada!!

//router.use(validId) //conserte o middleware vslidId e despois, o descomente!!
router.get("/findById/:id?", userController.findById)//testada!!
router.patch("/:id",validId, validUser, userController.update)//testada!!

export default router