import { Router } from "express";
import { login, register } from '../controllers/auth-controller';
import * as courseController from '../controllers/course-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const router = Router();

const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);

const courseRouter = Router();
courseRouter.use(authMiddleware);

courseRouter.post("/", courseController.create);
courseRouter.get("/", courseController.getAll);
courseRouter.put("/:id", courseController.update);
courseRouter.delete("/:id", courseController.remove);

router.use("/auth", authRouter);
router.use("/courses", courseRouter);

export default router;