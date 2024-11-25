import express from "express"
import { login, signup } from "../controllers/auth.busAdmin.controller.js"
import { findAllbusAdmin } from "../controllers/busAdmin.controller.js"
const router = express.Router()

router.post("/login",login)
router.post("/signup",signup)
router.get("/getAllBusAdmin",findAllbusAdmin)
export default router