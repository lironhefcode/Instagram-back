

import express,{ Express } from 'express'
import cors from 'cors'
import path from 'path'
import { storyRoutes } from './api/story/story.routes'
import { authRoutes } from './api/auth/auth.routes'
import cookieParser from 'cookie-parser'
import { setupAsyncLocalStorage } from './midlewaers/setupAls.middleware'
import { userRoutes } from './api/user/user.routes'

const app :Express = express()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
}else{
    const corsOptions = {
        origin: [   'http://127.0.0.1:3000',
                    'http://localhost:3000',
                    'http://127.0.0.1:4200',
                    'http://localhost:4200'
                ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use(cookieParser())
app.use(express.json())
app.all('*',setupAsyncLocalStorage)


app.use('/api/story', storyRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/user'),userRoutes
const port =  3000
app.listen( port,'0.0.0.0', ()=>{
    console.log('Server is running on port: ' + port)
})
