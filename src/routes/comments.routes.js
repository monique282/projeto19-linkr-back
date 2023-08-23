import { Router } from "express";
import {
  createComment,
  getCommentsById,
} from "../controllers/comments.controller.js";
import validateAuth from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { commentSchema } from "../schemas/userSchema.js";

const commentsRouter = Router();

commentsRouter.post(
  "/comment/:id",
  validateAuth,
  validateSchema(commentSchema),
  createComment
);
commentsRouter.get("/comments/:id", validateAuth, getCommentsById);

export default commentsRouter;
