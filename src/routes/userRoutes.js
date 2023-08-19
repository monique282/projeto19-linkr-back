import { Router } from "express";
import { loginTable, registerTable } from "../schemas/userSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginPost, performSearchNoServerGet, registerPost, usersSessionslete } from "../controllers/controlUsers.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(registerTable), registerPost);
userRouter.post("/signin", validateSchema(loginTable), loginPost);
userRouter.delete("/logout", usersSessionslete);
userRouter.get("/search", performSearchNoServerGet);

export default userRouter;