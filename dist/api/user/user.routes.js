"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const requierdAuth_middleware_1 = require("../../midlewaers/requierdAuth.middleware");
const router = express_1.default.Router();
router.post('/follow', requierdAuth_middleware_1.requireAuth, user_controller_1.follow);
router.post('/like', requierdAuth_middleware_1.requireAuth, user_controller_1.like);
exports.userRoutes = router;
//# sourceMappingURL=user.routes.js.map