"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stroyService = void 0;
const mongodb_1 = require("mongodb");
const als_service_1 = require("../../services/als.service");
const db_service_1 = require("../../services/db.service");
const dotenv_1 = __importDefault(require("dotenv"));
const user_service_1 = require("../user/user.service");
dotenv_1.default.config();
exports.stroyService = {
    query,
    add,
    like
};
const collectionName = process.env.POSTS_COLLECTION_NAME;
async function query(filterBy = { txt: '' }) {
    try {
        const collection = await db_service_1.dbService.getCollection(collectionName);
        var storyCursor = collection.aggregate([{ $sample: { size: 7 } }]);
        const story = await storyCursor.toArray();
        return story;
    }
    catch (err) {
        throw err;
    }
}
async function add(story) {
    try {
        const collection = await db_service_1.dbService.getCollection(collectionName);
        await collection.insertOne(story);
        return story;
    }
    catch (err) {
        throw err;
    }
}
async function getStoryById(storyId) {
    const collection = await db_service_1.dbService.getCollection(collectionName);
    const story = await collection.findOne({ _id: mongodb_1.ObjectId.createFromHexString(storyId) });
    if (story)
        return story;
    throw new Error('story not found');
}
async function like(storyId) {
    try {
        const story = await getStoryById(storyId);
        const userFromCookeis = als_service_1.asynLocalStorage.getStore().loggedinUser;
        const isLiked = story.likedBy.some(user => user._id === mongodb_1.ObjectId.createFromHexString(userFromCookeis._id));
        let likedBy;
        if (isLiked) {
            likedBy = story.likedBy.filter(user => user._id !== mongodb_1.ObjectId.createFromHexString(userFromCookeis._id));
        }
        else {
            const newLikeBy = user_service_1.userService.createminiUser(userFromCookeis);
            likedBy = [...story.likedBy, newLikeBy];
        }
        const collection = await db_service_1.dbService.getCollection(collectionName);
        collection.updateOne({ _id: story._id }, { $set: { likedBy } });
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=story.service.js.map