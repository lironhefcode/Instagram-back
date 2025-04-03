import { error } from "console"
import { dbService } from "../../services/db.service"
import { User } from "../../models/userInterface"


export const userService = {
    getByUsername,
    addUser
}


const collectionName =process.env.USER_COLLECTION_NAME as string
async function getByUsername(username:string):Promise<User | null>  {
    try{

        const collection = await dbService.getCollection(collectionName)
        const user  = await collection.findOne({username}) as User | null
        if(user !== null){
           
            return user as User 
         
        }else{
            return null
        }
    }catch(err){
        console.log('error finind user')
        throw err
    }
}

async function addUser(username:string,fullname:string,password:string) {
    const newUser:User = {
        username,
        fullname,
        password,
        imgUrl: 'userProfile.png',
        stories:[],
        following: [],
        followers: [],
        likedStoryIds: [],  
        savedStoryIds: []
    }
    const collection = await dbService.getCollection(collectionName)
    await collection.insertOne(newUser) 
    return newUser
}