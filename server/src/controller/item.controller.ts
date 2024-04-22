import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Item } from "../entity/Item";

export class ItemController extends Controller {
    repository = AppDataSource.getRepository(Item);
}