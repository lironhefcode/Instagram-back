"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const story_controller_1 = require("./story.controller");
const router = express_1.default.Router();
router.get('/', story_controller_1.loadStories);
router.post('/', story_controller_1.addStory);
exports.storyRoutes = router;
//# sourceMappingURL=story.routes.js.map