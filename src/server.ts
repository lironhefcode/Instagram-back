import express, { Express } from "express"
import cors from "cors"
import path from "path"

import { storyRoutes } from "./api/story/story.routes"
import { authRoutes } from "./api/auth/auth.routes"
import cookieParser from "cookie-parser"
import { setupAsyncLocalStorage } from "./midlewaers/setupAls.middleware"
import { userRoutes } from "./api/user/user.routes"

const app: Express = express()

const corsOptions = {
  origin: [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1:4200",
    "http://localhost:4200",
    "https://instagram-front-ok8y.onrender.com",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())
app.all("*", setupAsyncLocalStorage)

app.use("/api/story", storyRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
const PORT = process.env.PORT ? +process.env.PORT : 3000

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port: " + PORT)
})
