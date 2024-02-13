import express from "express";
import { signup, login, logout } from "../controller/auth.controller.js"
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;