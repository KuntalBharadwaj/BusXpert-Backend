import express from "express"
import { login, signup } from "../controllers/auth.admin.controller.js"
import {AddedBus, findAllBusses, GetnotAssignBus, UpdateBusDetails} from "../controllers/admin.controller.js"
const router = express.Router()

router.post("/login",login)
router.post("/signup",signup)
router.get("/getAllBus",findAllBusses)
router.patch("/updateBusdetails/:id",UpdateBusDetails)
router.post("/AddedBus",AddedBus)
router.get("/getnotAssignBus",GetnotAssignBus)

export default router