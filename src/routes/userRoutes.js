import { Router } from "express";
import { followSchema, loginTable, registerTable } from "../schemas/userSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { follow, loginPost, performSearchNoServerGet, registerPost, usersSessionslete } from "../controllers/controlUsers.js";
import validateAuth from "../middlewares/validateAuth.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(registerTable), registerPost);
userRouter.post("/signin", validateSchema(loginTable), loginPost);
userRouter.delete("/logout", usersSessionslete);
userRouter.get("/search/:name", performSearchNoServerGet);
userRouter.post("/follows", validateAuth, validateSchema(followSchema), follow);

export default userRouter;