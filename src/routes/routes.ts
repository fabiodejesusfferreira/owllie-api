import { Router } from "express";
import { login, register } from '../controllers/auth-controller';

const router = Router();
const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

router.use("/auth", authRouter)

export default router;