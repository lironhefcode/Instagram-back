import { story } from "../../models/stroyInterface"
import { dbService } from "../../services/db.service"
import dotenv from "dotenv"
dotenv.config()

export const stroyService = {
    query
}
const collectionName =process.env.POSTS_COLLECTION_NAME as string
async function query(filterBy = { txt: '' }) {
	try {
       
        
		const collection = await dbService.getCollection(collectionName)
		var storyCursor =  collection.find({})

		

		const story = await storyCursor.toArray()
		return story
	} catch (err) {

		throw err
	}
}
async function add(story : story) {
    const collection = await dbService.getCollection(collectionName)
    await collection.insertOne(story)
    return story
}