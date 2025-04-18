"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_service_1 = require("../../services/db.service");
const als_service_1 = require("../../services/als.service");
const mongodb_1 = require("mongodb");
exports.userService = {
  getByUsername,
  addUser,
  handlefollow,
  handleLike,
  createminiUser,
};
const collectionName = process.env.USER_COLLECTION_NAME;
async function getByUsername(username) {
  try {
    const collection =
      await db_service_1.dbService.getCollection(collectionName);
    const user = await collection.findOne({ username });
    if (user !== null) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log("error finind user");
    throw err;
  }
}
async function handlefollow(username) {
  try {
    const collection =
      await db_service_1.dbService.getCollection(collectionName);
    const secondaryUser = await getByUsername(username);
    const loggedinUser = als_service_1.asynLocalStorage.getStore().loggedinUser;
    const loggedUser = await getByUsername(loggedinUser.username);
    if (secondaryUser && loggedUser) {
      const isFollowed = loggedUser.following.some(
        (id) => id.username === secondaryUser.username,
      );
      let secondaryUserFollower;
      let loggedUserFollowing;
      if (isFollowed) {
        secondaryUserFollower = secondaryUser.followers.filter(
          (user) =>
            user._id !==
            mongodb_1.ObjectId.createFromHexString(secondaryUser._id),
        );
        loggedUserFollowing = loggedUser.following.filter(
          (user) =>
            user._id !==
            mongodb_1.ObjectId.createFromHexString(secondaryUser._id),
        );
      } else {
        const miniLogggedinUser = createminiUser(loggedUser);
        const minisecondaryUser = createminiUser(secondaryUser);
        secondaryUserFollower = [...secondaryUser.followers, miniLogggedinUser];
        loggedUserFollowing = [...loggedinUser.following, minisecondaryUser];
      }
      await collection.updateOne(
        { _id: mongodb_1.ObjectId.createFromHexString(secondaryUser._id) },
        { $set: { followers: secondaryUserFollower } },
      );
      const updatedUser = await collection.updateOne(
        { _id: mongodb_1.ObjectId.createFromHexString(loggedUser._id) },
        { $set: { following: loggedUserFollowing } },
      );
      return updatedUser;
    } else {
      throw new Error("one of the users are not valid");
    }
  } catch (err) {
    throw err;
  }
}
async function handleLike(storyId) {
  try {
    const userFromCookeis =
      als_service_1.asynLocalStorage.getStore().loggedinUser;
    const loggedUser = await getByUsername(userFromCookeis.username);
    if (loggedUser) {
      const isLiked = loggedUser.likedStoryIds.some((id) => id === storyId);
      let likedStoryIds;
      if (isLiked) {
        likedStoryIds = loggedUser.likedStoryIds.filter((id) => id !== storyId);
      } else {
        likedStoryIds = [...loggedUser.likedStoryIds, storyId];
      }
      const collection =
        await db_service_1.dbService.getCollection(collectionName);
      collection.updateOne(
        { _id: mongodb_1.ObjectId.createFromHexString(loggedUser._id) },
        { $set: { likedStoryIds: likedStoryIds } },
      );
      const user = await getByUsername(loggedUser.username);
      return user;
    } else {
      throw new Error("no user");
    }
  } catch (err) {
    throw err;
  }
}
function createminiUser(user) {
  return {
    _id: mongodb_1.ObjectId.createFromHexString(user._id),
    username: user.username,
    imgUrl: user.imgUrl,
  };
}
async function addUser(username, fullname, password) {
  const newUser = {
    username,
    fullname,
    password,
    imgUrl: "userProfile.png",
    stories: [],
    following: [],
    followers: [],
    likedStoryIds: [],
    savedStoryIds: [],
  };
  const collection = await db_service_1.dbService.getCollection(collectionName);
  await collection.insertOne(newUser);
  return newUser;
}
//# sourceMappingURL=user.service.js.map
