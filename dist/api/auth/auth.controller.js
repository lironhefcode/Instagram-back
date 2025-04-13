"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.signup = signup;
exports.logout = logout;
const auth_service_1 = require("./auth.service");
async function login(req, res) {
    try {
        console.log('hello');
        const { username, password } = req.body;
        const user = await auth_service_1.authService.login(username, password);
        const loginToken = auth_service_1.authService.getLoginToken(user);
        res.cookie('loginToken', loginToken, { secure: true });
        res.json(user);
    }
    catch (err) {
        console.log('conroller');
        console.log('error login', err);
        res.status(401).send({ err: 'Failed to Login' });
    }
}
async function signup(req, res) {
    console.log(req.body);
    try {
        const { fullname, username, password } = req.body;
        const account = await auth_service_1.authService.signup(fullname, username, password);
        const user = await auth_service_1.authService.login(account.username, password);
        const loginToken = auth_service_1.authService.getLoginToken(user);
        res.cookie('loginToken', loginToken, { secure: true });
        res.json(user);
    }
    catch (err) {
        console.log('error signup', err);
        res.status(401).send({ err: 'Failed to signup' });
    }
}
async function logout(req, res) {
    try {
        res.clearCookie('loginToken');
        res.send({ msg: 'Logged out successfully' });
    }
    catch (err) {
        res.status(400).send({ err: 'Failed to logout' });
    }
}
//# sourceMappingURL=auth.controller.js.map