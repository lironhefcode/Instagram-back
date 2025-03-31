import { Db, MongoClient } from 'mongodb'

import dotenv from "dotenv"
dotenv.config()

export const dbService = { getCollection }

var dbConn : Db | null = null

async function getCollection(collectionName : string) {
	try {
		const db = await _connect()
		const collection = await db.collection(collectionName)
		return collection
	} catch (err) {
		console.log('Failed to get Mongo collection', err)
		throw err
	}
}

async function _connect() {
	if (dbConn) return dbConn
 
	try {
		const url:string = process.env.DB_CONN_STRING as string
		const db:string = process.env.DB_NAME as string
		const client = await MongoClient.connect(url)
		return dbConn = client.db(db)
	} catch (err) {
		console.log('Cannot Connect to DB', err)
		throw err
	}
}