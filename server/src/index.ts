import { AuthUserController } from "./controller/auth-user.controller";
import { AppDataSource } from "./data-source"
import { AuthUser } from "./entity/AuthUser";
import { Item } from "./entity/Item"
import { User } from "./entity/User"
import { handleAuthorizationError } from "./protect-routes";
import { getRouter } from "./routes";
import express = require("express");

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.customerId = "001"
//     user.address = "itt"
//     user.idCard = "123456IE"
//     user.name = "teszt miki"
//     user.phone = "06201236789"
//     const item = new Item()
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))

async function main() {

    await AppDataSource.initialize();

    const app = express();

    app.use(express.json());

    const cors = require('cors');
    const corsOptions = {
        origin: 'http://localhost:4200',
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200
    }
    app.use(cors(corsOptions));

    //app.use('/api', getRouter());
    app.use('/api', getRouter(), handleAuthorizationError);
    app.listen(3000, () => {
        console.log('Listening on :3000 ...');
    });
}

main();