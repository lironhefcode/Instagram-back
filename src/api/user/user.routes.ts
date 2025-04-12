import express from 'express'
import { follow, like } from './user.controller'
import { requireAuth } from '../../midlewaers/requierdAuth.middleware'

const router = express.Router()


router.post('/follow',requireAuth,follow)
router.post('/like',requireAuth,like)


export const userRoutes = router