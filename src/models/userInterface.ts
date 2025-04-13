import { ObjectId } from "mongodb";
import { byUserIntreface } from "./byUserInterface";
import { Ministory } from "./stroyInterface";


export interface User{
    _id:string
	username: string,
	password:string,
	fullname: string,
	imgUrl: string,
	stories:Ministory[],
	following: byUserIntreface[]
	followers:byUserIntreface[] ,
	likedStoryIds: string[], 
	savedStoryIds: string[],
}