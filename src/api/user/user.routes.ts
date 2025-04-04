import express from 'express'
import { follow } from './user.controller'
import { requireAuth } from '../../midlewaers/requierdAuth.middleware'

const router = express.Router()


router.post('/follow',requireAuth,follow)



export const userRoutes = router