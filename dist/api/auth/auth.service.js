"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../user/user.service");
const cryptr = new cryptr_1.default(process.env.SECRET || "Secret-Puk-1234");
exports.authService = {
  login,
  getLoginToken,
  signup,
  validateToken,
};
async function login(username, password) {
  try {
    const user = await user_service_1.userService.getByUsername(username);
    if (!user) return Promise.reject("no user");
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match) return Promise.reject("Invalid username or password");
    user.password = "";
    return user;
  } catch (err) {
    console.log("login service");
    console.log(err);
    throw err;
  }
}
async function signup(username, fullname, password) {
  const saltRounds = 10;
  if (!username || !password || !fullname)
    return Promise.reject("Missing credntials");
  const userExist = await user_service_1.userService.getByUsername(username);
  if (userExist) return Promise.reject("Username already taken");
  const hash = await bcrypt_1.default.hash(password, saltRounds);
  const user = await user_service_1.userService.addUser(
    username,
    fullname,
    hash,
  );
  return user;
}
function getLoginToken(user) {
  return cryptr.encrypt(JSON.stringify(user));
}
function validateToken(loginToken) {
  try {
    const json = cryptr.decrypt(loginToken);
    const loggedinUser = JSON.parse(json);
    return loggedinUser;
  } catch (err) {
    console.log("Invalid login token");
  }
  return null;
}
//# sourceMappingURL=auth.service.js.map
