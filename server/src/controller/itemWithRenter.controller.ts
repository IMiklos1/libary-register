import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { ItemWithRenterDto } from "../dtos/ItemWithRenterDto";

export class ItemWithRenterController extends Controller {
    repository = AppDataSource.getRepository(ItemWithRenterDto);
}