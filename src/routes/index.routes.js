import { Router } from "express";
import userRouter from "./userRoutes.js";
import homeRouter from "./home.routes.js";
import postsRouter from "./posts.routes.js";
import hashtagRouter from "./hashtag.routes.js";

const router = Router();

router.use(homeRouter)
router.use(postsRouter)
router.use([
    // rota para os usuario
    userRouter
]);
router.use(hashtagRouter)

export default router;
