import { ObjectId } from "mongodb"
import { Asl } from "../../models/aslInterface"
import { NewStory, story } from "../../models/stroyInterface"
import { User } from "../../models/userInterface"
import { asynLocalStorage } from "../../services/als.service"
import { dbService } from "../../services/db.service"
import dotenv from "dotenv"
import { userService } from "../user/user.service"
import { byUserIntreface } from "../../models/byUserInterface"
dotenv.config()

export const stroyService = {
  query,
  add,
  like,
}
const collectionName = process.env.POSTS_COLLECTION_NAME as string
async function query(filterBy = { txt: "" }) {
  try {
    const collection = await dbService.getCollection(collectionName)
    var storyCursor = collection.aggregate([{ $sample: { size: 7 } }])
    const story = await storyCursor.toArray()
    return story
  } catch (err) {
    throw err
  }
}
async function add(newStory: NewStory) {
  try {
    const userFromCookeis = (asynLocalStorage.getStore() as Asl)
      .loggedinUser as User
    let story: Omit<story, "_id"> = {
      txt: newStory.txt,
      imgUrl: newStory.imgUrl,
      by: userService.createminiUser(userFromCookeis),
      comments: [],
      likedBy: [],
    }
    const collection = await dbService.getCollection(collectionName)
    const res = await collection.insertOne(story)
    const createdStory: story = { ...story, _id: res.insertedId }
    return createdStory
  } catch (err) {
    throw err
  }
}
async function getStoryById(storyId: string) {
  const collection = await dbService.getCollection(collectionName)
  const story = await collection.findOne({
    _id: new ObjectId(storyId),
  })
  if (story) return story as story
  throw new Error("story not found")
}
async function like(storyId: string) {
  try {
    const story = await getStoryById(storyId)
    const userFromCookeis = (asynLocalStorage.getStore() as Asl)
      .loggedinUser as User
    const isLiked = story.likedBy.some(
      (user) => user._id === new ObjectId(userFromCookeis._id),
    )
    let likedBy: byUserIntreface[]
    if (isLiked) {
      likedBy = story.likedBy.filter(
        (user) => user._id !== new ObjectId(userFromCookeis._id),
      )
    } else {
      const newLikeBy = userService.createminiUser(userFromCookeis)
      likedBy = [...story.likedBy, newLikeBy]
    }
    const collection = await dbService.getCollection(collectionName)
    collection.updateOne({ _id: story._id }, { $set: { likedBy } })
  } catch (err) {
    throw err
  }
}
