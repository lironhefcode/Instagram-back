import { Request, Response } from "express"
import { User } from "../../models/userInterface"
import { authService } from "./auth.service"

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body
    const user = await authService.login(username, password)
    const loginToken = authService.getLoginToken(user)
    res.cookie("loginToken", loginToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    })
    res.json(user)
  } catch (err) {
    res.status(401).send({ err: "Failed to Login" })
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const { fullname, username, password } = req.body

    const account = await authService.signup(fullname, username, password)
    const user = await authService.login(username, password)
    const loginToken = authService.getLoginToken(user)
    res.cookie("loginToken", loginToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    })
    res.json(user)
  } catch (err) {
    res.status(401).send({ err: "Failed to signup " + err })
  }
}
export async function logout(req, res: Response) {
  try {
    res.clearCookie("loginToken")
    res.send({ msg: "Logged out successfully" })
  } catch (err) {
    res.status(400).send({ err: "Failed to logout" })
  }
}
