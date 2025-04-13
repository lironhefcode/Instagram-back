import express from 'express'
import { follow, getByUsername, like, updateImg } from './user.controller'
import { requireAuth } from '../../midlewaers/requierdAuth.middleware'

const router = express.Router()

router.get('/:username',requireAuth,getByUsername)
router.post('/follow',requireAuth,follow)
router.post('/like',requireAuth,like)
router.put('/img',requireAuth,updateImg)

export const userRoutes = router