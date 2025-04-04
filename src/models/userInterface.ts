import { ObjectId } from "mongodb";
import { byUserIntreface } from "./byUserInterface";


export interface User{
    _id:string
	username: string,
	password:string,
	fullname: string,
	imgUrl: string,
	stories:{
		_id:ObjectId
		imgUrl:string,
	} [],
	following: byUserIntreface[]
	followers:byUserIntreface[] ,
	likedStoryIds: string[], 
	savedStoryIds: string[],
}