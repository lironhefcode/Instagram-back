"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.like = like;
exports.follow = follow;
const user_service_1 = require("./user.service");
const story_service_1 = require("../story/story.service");
async function like(req, res) {
    try {
        const { storyId } = req.body;
        const user = await user_service_1.userService.handleLike(storyId);
        await story_service_1.stroyService.like(storyId);
        res.json(user);
    }
    catch (err) {
    }
}
async function follow(req, res) {
    try {
        const { username } = req.body;
        const user = await user_service_1.userService.handlefollow(username);
        res.json(user);
    }
    catch (err) {
        console.log('failed to follow', err);
        res.status(404).send({ err: 'faild to follow' });
    }
}
//# sourceMappingURL=user.controller.js.map