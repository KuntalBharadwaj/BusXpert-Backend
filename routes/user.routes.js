import express from "express";
import { login, logout, signup } from "../controllers/auth.user.controller.js";
import { HighlightBusses , FindBusbyId, FindAllStudents } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/highlightedBus",HighlightBusses)
router.post("/findbusbyid",FindBusbyId)
router.get("/findAllStudents",FindAllStudents)

export default router;