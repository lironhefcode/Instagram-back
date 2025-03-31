"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_service_1 = require("../../services/db.service");
exports.userService = {
    getByUsername,
    addUser
};
const collectionName = process.env.USER_COLLECTION_NAME;
async function getByUsername(username) {
    try {
        const collection = await db_service_1.dbService.getCollection(collectionName);
        const user = await collection.findOne({ username });
        if (user !== null) {
            return user;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log('error finind user');
        throw err;
    }
}
async function addUser(username, fullname, password) {
    const newUser = {
        username,
        fullname,
        password,
        imgUrl: 'userProfile.png',
        following: [],
        followers: [],
        likedStoryIds: [],
        savedStoryIds: []
    };
    const collection = await db_service_1.dbService.getCollection(collectionName);
    await collection.insertOne(newUser);
    return newUser;
}
//# sourceMappingURL=user.service.js.map