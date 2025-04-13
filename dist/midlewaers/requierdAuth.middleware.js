"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const als_service_1 = require("../services/als.service");
function requireAuth(req, res, next) {
    const { loggedinUser } = als_service_1.asynLocalStorage.getStore();
    if (!loggedinUser)
        return res.status(401).send('Not Authenticated');
    next();
}
//# sourceMappingURL=requierdAuth.middleware.js.map