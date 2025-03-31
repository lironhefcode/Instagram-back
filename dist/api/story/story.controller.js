"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadStories = loadStories;
exports.addStory = addStory;
const story_service_1 = require("./story.service");
async function loadStories(req, res) {
    try {
        const stories = await story_service_1.stroyService.query();
        res.json(stories);
    }
    catch (err) {
        console.error('Failed to get stories', err);
        res.status(400).send({ err: 'Failed to get stories' });
    }
}
async function addStory(req, res) {
    const newStory = req.body;
    try {
    }
    catch (err) {
        console.error('Failed to add stories', err);
        res.status(400).send({ err: 'Failed to add story' });
    }
}
//# sourceMappingURL=story.controller.js.map