import { Router } from "express";
import { getPlayer, getPlayerById, postPlayer, deletePlayer, updatePlayer } from "../controllers/players-controller";
import { getClubs } from "../controllers/clubs-controller";

const router = Router();

router.get("/players", getPlayer);
router.get("/players/:id", getPlayerById);
router.post("/players", postPlayer);
router.patch("/players/:id", updatePlayer);
router.delete("/players/:id", deletePlayer);

router.get("/clubs", getClubs);

export default router;