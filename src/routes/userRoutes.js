import { Router } from "express";
import { registerTable } from "../schemas/userSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerPost } from "../controllers/controlUsers.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(registerTable), registerPost);

export default userRouter;