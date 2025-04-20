import { error } from "console"
import { dbService } from "../../services/db.service"
import { User } from "../../models/userInterface"
import { Asl } from "../../models/aslInterface"
import { asynLocalStorage } from "../../services/als.service"
import { byUserIntreface } from "../../models/byUserInterface"
import { ObjectId } from "mongodb"
import { follow } from "./user.controller"
import { Ministory, story } from "../../models/stroyInterface"

export const userService = {
  getByUsername,
  addUser,
  handlefollow,
  handleLike,
  createminiUser,
  updateImg,
  addStory,
}

const collectionName = process.env.USER_COLLECTION_NAME as string
async function getByUsername(username: string): Promise<User | null> {
  try {
    const collection = await dbService.getCollection(collectionName)
    const user = (await collection.findOne({ username })) as User | null
    if (user !== null) {
      return user as User
    } else {
      return null
    }
  } catch (err) {
    throw err
  }
}

async function handlefollow(username: string) {
  try {
    const collection = await dbService.getCollection(collectionName)
    const secondaryUser = await getByUsername(username)
    const loggedUser = await getLoggedUser()

    if (secondaryUser && loggedUser) {
      const isFollowed = loggedUser.following.some(
        (id) => id.username === secondaryUser.username,
      )
      let secondaryUserFollower: byUserIntreface[]
      let loggedUserFollowing: byUserIntreface[]
      if (isFollowed) {
        secondaryUserFollower = secondaryUser.followers.filter(
          (user) => user._id !== new ObjectId(secondaryUser._id),
        )
        loggedUserFollowing = loggedUser.following.filter(
          (user) => user._id !== new ObjectId(secondaryUser._id),
        )
      } else {
        const miniLogggedinUser: byUserIntreface = createminiUser(loggedUser)
        const minisecondaryUser: byUserIntreface = createminiUser(secondaryUser)
        secondaryUserFollower = [...secondaryUser.followers, miniLogggedinUser]
        loggedUserFollowing = [...loggedUser.following, minisecondaryUser]
      }
      await collection.updateOne(
        { _id: new ObjectId(secondaryUser._id) },
        { $set: { followers: secondaryUserFollower } },
      )
      await collection.updateOne(
        { _id: new ObjectId(loggedUser._id) },
        { $set: { following: loggedUserFollowing } },
      )
      const updatedUser = await getByUsername(loggedUser.username)
      return updatedUser
    } else {
      throw "one of the users are not valid"
    }
  } catch (err) {
    throw err
  }
}

async function handleLike(storyId: string): Promise<User> {
  try {
    const loggedUser = await getLoggedUser()
    if (loggedUser) {
      const isLiked = loggedUser.likedStoryIds.some((id) => id === storyId)
      let likedStoryIds: string[]
      if (isLiked) {
        likedStoryIds = loggedUser.likedStoryIds.filter((id) => id !== storyId)
      } else {
        likedStoryIds = [...loggedUser.likedStoryIds, storyId]
      }
      const collection = await dbService.getCollection(collectionName)
      collection.updateOne(
        { _id: new ObjectId(loggedUser._id) },
        { $set: { likedStoryIds: likedStoryIds } },
      )
      const user = (await getByUsername(loggedUser.username)) as User
      return user
    } else {
      throw new Error("no user")
    }
  } catch (err) {
    throw err
  }
}
async function addStory(story: story) {
  const collection = await dbService.getCollection(collectionName)
  const loggedUser = await getLoggedUser()
  const newStory: Ministory = {
    _id: story._id.toString(),
    imgUrl: story.imgUrl,
  }
  const stories = [...loggedUser.stories, newStory]
  collection.updateOne(
    { _id: new ObjectId(loggedUser._id.toString()) },
    { $set: { stories: stories } },
  )
  return (await getByUsername(loggedUser.username)) as User
}
function createminiUser(user: User): byUserIntreface {
  return {
    _id: new ObjectId(user._id),
    username: user.username,
    imgUrl: user.imgUrl,
  }
}
async function updateImg(imgUrl: string) {
  try {
    const loggedUser = await getLoggedUser()

    const collection = await dbService.getCollection(collectionName)
    collection.updateOne(
      { _id: new ObjectId(loggedUser._id.toString()) },
      { $set: { imgUrl: imgUrl } },
    )
    const user = (await getByUsername(loggedUser.username)) as User
    return user
  } catch (err) {
    throw err
  }
}
async function getLoggedUser() {
  const userFromCookeis = (asynLocalStorage.getStore() as Asl)
    .loggedinUser as User
  const loggedUser = (await getByUsername(userFromCookeis.username)) as User
  return loggedUser
}

async function addUser(username: string, fullname: string, password: string) {
  const newUser: Omit<User, "_id"> = {
    username,
    fullname,
    password,
    imgUrl: "userProfile.png",
    stories: [],
    following: [],
    followers: [],
    likedStoryIds: [],
    savedStoryIds: [],
  }
  const collection = await dbService.getCollection(collectionName)
  const user = (await collection.insertOne(newUser)) as unknown as User
  return user
}
