import { Router } from "express";
import { UserCreate, UserDelete, UserList, UserSignIN, UserSignUp, UserUpdate } from "../controller/UserController";

const routes = Router()
routes.post("/users/sign-up",UserSignUp)
routes.post("/users/sign-in",UserSignIN)
routes.get("/get/users-list",UserList)
routes.post("/users/create",UserCreate)
routes.post("/users/update",UserUpdate)
routes.post("/users/delete",UserDelete)
export default routes