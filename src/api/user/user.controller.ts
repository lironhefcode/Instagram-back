import { Request, Response } from "express"
import { userService } from "./user.service"
import { Console } from "console"
import { authService } from "../auth/auth.service"
interface FollowRequestBody {
    username: string
}





export async function follow(req:Request, res:Response) {
    try{
        const {username} = req.body
          const user =   userService.follow(username)
         
          res.json(user)
    }catch(err){
        console.log('failed to follow',err)
        res.status(404).send({err:'faild to follow'})
    }
}