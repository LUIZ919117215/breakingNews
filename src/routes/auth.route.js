//código não entendido
//tentando
//código entendido//
import { Router } from 'express';
const router = Router();

import { login } from '../controllers/auth.controller.js';

router.post("/", login)//testada!!

export default router