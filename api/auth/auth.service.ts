import Cryptr from "cryptr"
import bcrypt from 'bcrypt'
import { userService } from "../user/user.service"
import { User } from "../../models/userInterface"


const cryptr = new Cryptr(process.env.SECRET || 'Secret-Puk-1234')

export const authService ={
    login,
    getLoginToken,
    signup,
}
async function login(username:string,password:string) {
    try{
        const user = await userService.getByUsername(username)
        if(!user) return Promise.reject('no user')
        const match = await bcrypt.compare(password, user.password)
	if (!match) return Promise.reject('Invalid username or password')
     user.password = ''
    return user
    }catch(err){
        console.log(err)
        throw err
    }
}
async function signup(username:string,fullname:string,password:string) {
    const saltRounds = 10
    if(!username || !password || !fullname) return Promise.reject('Missing credntials')
        const userExist = await userService.getByUsername(username)
	if (userExist) return Promise.reject('Username already taken')
        const hash = await bcrypt.hash(password, saltRounds)
    const user = await userService.addUser(username,fullname,hash)
    return user
}
function getLoginToken(user:User) {
	
	return cryptr.encrypt(JSON.stringify(user))
}