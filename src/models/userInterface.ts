import { ObjectId } from "mongodb";
import { byUserIntreface } from "./byUserInterface";


export interface User{
    _id?:ObjectId,
	username: string,
	password:string,
	fullname: string,
	imgUrl: string,

	following: byUserIntreface[]
	followers:byUserIntreface[] ,
	likedStoryIds: String[], 
	savedStoryIds: string[],
}