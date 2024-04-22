import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserController extends Controller {
    repository = AppDataSource.getRepository(User);
}