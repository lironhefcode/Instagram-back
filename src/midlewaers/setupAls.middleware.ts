import { authService } from '../api/auth/auth.service.js'
import { asynLocalStorage } from '../services/als.service.js'

export async function setupAsyncLocalStorage(req, res, next) {
	const storage = {}
    
	asynLocalStorage.run(storage, () => {
		if (!req.cookies?.loginToken) return next()
		const loggedinUser = authService.validateToken(req.cookies.loginToken)

    const alsStore = asynLocalStorage.getStore() 
		if (loggedinUser && alsStore) {
			alsStore.loggedinUser = loggedinUser
		}
		next()
	})
}