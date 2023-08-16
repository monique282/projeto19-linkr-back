import { Router } from "express";
import { registerTable } from "../schemas/userSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginPost, registerPost } from "../controllers/controlUsers.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(registerTable), registerPost);
userRouter.post("/signin", validateSchema(loginTable), loginPost);

export default userRouter;