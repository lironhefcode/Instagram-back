import { byUserIntreface } from "./byUserInterface";


export interface comentInterface {
    id:string,
    txt:string,
    by:byUserIntreface,
    likedBy:byUserIntreface[]
}