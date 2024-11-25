import express from "express"
import { login, signup } from "../controllers/auth.admin.controller.js"
import {findAllBusses} from "../controllers/admin.controller.js"
const router = express.Router()

router.post("/login",login)
router.post("/signup",signup)
router.get("/getAllBus",findAllBusses)

export default router