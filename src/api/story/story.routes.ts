import express from 'express'
import { addStory, loadStories } from './story.controller'
const router = express.Router()




router.get('/',loadStories)
router.post('/',addStory)

export const storyRoutes = router