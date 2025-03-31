"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stroyService = void 0;
const db_service_1 = require("../../services/db.service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.stroyService = {
    query
};
const collectionName = process.env.POSTS_COLLECTION_NAME;
async function query(filterBy = { txt: '' }) {
    try {
        const collection = await db_service_1.dbService.getCollection(collectionName);
        var storyCursor = collection.find({});
        const story = await storyCursor.toArray();
        return story;
    }
    catch (err) {
        throw err;
    }
}
async function add(story) {
    const collection = await db_service_1.dbService.getCollection(collectionName);
    await collection.insertOne(story);
    return story;
}
//# sourceMappingURL=story.service.js.map