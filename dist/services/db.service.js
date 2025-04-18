"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbService = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.dbService = { getCollection };
var dbConn = null;
async function getCollection(collectionName) {
  try {
    const db = await _connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    console.log("Failed to get Mongo collection", err);
    throw err;
  }
}
async function _connect() {
  if (dbConn) return dbConn;
  try {
    const url = process.env.DB_CONN_STRING;
    const db = process.env.DB_NAME;
    const client = await mongodb_1.MongoClient.connect(url);
    return (dbConn = client.db(db));
  } catch (err) {
    console.log("Cannot Connect to DB", err);
    throw err;
  }
}
//# sourceMappingURL=db.service.js.map
