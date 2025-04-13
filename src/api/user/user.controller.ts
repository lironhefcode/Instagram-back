import { Request, Response } from "express"
import { userService } from "./user.service"
import { Console } from "console"
import { authService } from "../auth/auth.service"
import { stroyService } from "../story/story.service"


export async function getByUsername(req:Request, res:Response) {
    try{
        const {username} = req.params
        const user = await userService.getByUsername(username)
       if(!user){
        throw ('no user found')
       }
        res.json(user)

    }catch(err){
        console.log('failed to get user',err)
        res.status(404).send({err:'faild to  get user'})
    }
}

export async function like(req:Request, res:Response) {
    try{
        const {storyId} = req.body
        const user = await  userService.handleLike(storyId)
        await stroyService.like(storyId)
        res.json(user)
    }catch(err){
        console.log('failed to like',err)
        res.status(404).send({err:'faild to like'})
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
export async function updateImg(req:Request, res:Response) {
    try{
        const {imgUrl} = req.body
        const user = await userService.updateImg(imgUrl)
        res.json(user)
    }catch(err){
        console.log('failed to update img',err)
        res.status(404).send({err:'update img'})
    }
   
}