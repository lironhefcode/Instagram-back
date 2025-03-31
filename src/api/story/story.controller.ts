import { stroyService } from "./story.service";
import { Request, Response } from "express"


export async function loadStories(req : Request,res:Response) {
    try{

        const stories = await stroyService.query()
        res.json(stories)
    }catch(err){
        console.error('Failed to get stories', err)
		res.status(400).send({ err: 'Failed to get stories' })
    }
}
export async function addStory(req : Request,res:Response) {
    const newStory =  req.body
   try{

   }catch(err){
    console.error('Failed to add stories', err)
    res.status(400).send({ err: 'Failed to add story' })
   }
}