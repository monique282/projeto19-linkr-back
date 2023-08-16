import { Router } from "express";
import homeRouter from "./home.routes.js";
import postsRouter from "./posts.routes.js";

const router = Router();
router.use(homeRouter)
router.use(postsRouter)

export default router;
