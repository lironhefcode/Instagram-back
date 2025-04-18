import { AsyncLocalStorage } from "async_hooks";
import { User } from "../models/userInterface";
import { Asl } from "../models/aslInterface";

export const asynLocalStorage = new AsyncLocalStorage<Asl>();
