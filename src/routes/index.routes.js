import { Router } from "express";
import homeRouter from "./home.routes.js";

const router = Router();
router.use(homeRouter)

export default router;
