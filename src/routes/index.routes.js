import { Router } from "express";
import commentsRouter from "./comments.routes.js";
import hashtagRouter from "./hashtag.routes.js";
import homeRouter from "./home.routes.js";
import likeRouter from "./likes.routes.js";
import postsRouter from "./posts.routes.js";
import userRouter from "./userRoutes.js";

const router = Router();

router.use(homeRouter);
router.use(postsRouter);
router.use([
  // rota para os usuario
  userRouter,
]);
router.use(hashtagRouter);
router.use(likeRouter);
router.use(commentsRouter);

export default router;
