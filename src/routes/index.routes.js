import { Router } from "express";
import userRouter from "./userRoutes";

const router = Router();

router.use([
    // rota para os usuario
    userRouter
]);

export default router;
