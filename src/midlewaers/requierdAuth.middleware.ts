import { Asl } from "../models/aslInterface"
import { asynLocalStorage } from "../services/als.service"
import { setupAsyncLocalStorage } from "./setupAls.middleware"

export function requireAuth(req, res, next) {
	
	 const {loggedinUser} = asynLocalStorage.getStore() as Asl
	

	if (!loggedinUser) {
		
		return res.status(401).send('Not Authenticated')
	}
		
	next()
}