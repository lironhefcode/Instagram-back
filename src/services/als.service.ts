import { AsyncLocalStorage } from "async_hooks";
import { User } from "../models/userInterface";

export const asynLocalStorage = new AsyncLocalStorage<{loggedinUser?:User | null}>