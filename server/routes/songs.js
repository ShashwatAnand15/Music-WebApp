import express from "express";
import { getFeedSongs, getUserSongs, likeSong } from "../controllers/songs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ

router.get("/", verifyToken, getFeedSongs);
router.get("/:userId/songs", verifyToken, getUserSongs);

// UPDATE

router.patch("/:id/like", verifyToken, likeSong);
// POST

export default router;
