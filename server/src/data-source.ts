import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Item } from "./entity/Item"
import { AuthUser } from "./entity/AuthUser"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "libary-register",
    synchronize: true,
    logging: false,
    entities: [User, Item, AuthUser],
    migrations: [],
    subscribers: [],
})
