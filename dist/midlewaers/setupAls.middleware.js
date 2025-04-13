"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAsyncLocalStorage = setupAsyncLocalStorage;
const auth_service_js_1 = require("../api/auth/auth.service.js");
const als_service_js_1 = require("../services/als.service.js");
async function setupAsyncLocalStorage(req, res, next) {
    const storage = {};
    als_service_js_1.asynLocalStorage.run(storage, () => {
        if (!req.cookies?.loginToken)
            return next();
        const loggedinUser = auth_service_js_1.authService.validateToken(req.cookies.loginToken);
        const alsStore = als_service_js_1.asynLocalStorage.getStore();
        if (loggedinUser && alsStore) {
            alsStore.loggedinUser = loggedinUser;
        }
        next();
    });
}
//# sourceMappingURL=setupAls.middleware.js.map