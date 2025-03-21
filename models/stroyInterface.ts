import { byUserIntreface } from "./byUserInterface";
import { comentInterface } from "./comentInerface";
import { ObjectId } from "mongodb"
export interface story{
    _id:ObjectId,
    txt:string,
    imgUrl:string,
     by:byUserIntreface,
    comments:comentInterface[],
    likedBy:byUserIntreface[],
}