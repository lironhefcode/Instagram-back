import { Request, Response } from "express"
import { userService } from "./user.service"
import { Console } from "console"
import { authService } from "../auth/auth.service"
import { stroyService } from "../story/story.service"




export async function like(req:Request, res:Response) {
    try{
        const {storyId} = req.body
        const user = await  userService.handleLike(storyId)
        await stroyService.like(storyId)
        res.json(user)
    }catch(err){

    }
}

export async function follow(req:Request, res:Response) {
    try{
        const {username} = req.body
          const user = await  userService.handlefollow(username)
       
          res.json(user)
    }catch(err){
        console.log('failed to follow',err)
        res.status(404).send({err:'faild to follow'})
    }
}