import express from "express";
import { addStory, loadStories } from "./story.controller";
import { requireAuth } from "../../midlewaers/requierdAuth.middleware";
const router = express.Router();

router.get("/", requireAuth, loadStories);
router.post("/", requireAuth, addStory);

export const storyRoutes = router;
