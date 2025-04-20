import express from "express"
import { addStory, comment, loadStories } from "./story.controller"
import { requireAuth } from "../../midlewaers/requierdAuth.middleware"
const router = express.Router()

router.get("/", requireAuth, loadStories)
router.post("/", requireAuth, addStory)
router.post("/", requireAuth, comment)
export const storyRoutes = router
