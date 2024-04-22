
import express = require('express');
import { UserController } from './controller/user.controller';
import { ItemController } from './controller/item.controller';
import { ItemWithRenterController } from './controller/itemWithRenter.controller';

export function getRouter() {
    const router = express.Router();

    const userController = new UserController();
    router.get('/user', userController.getAll);
    router.get('/user/:id', userController.getOne);
    router.post('/user', userController.create);
    router.put('/user', userController.update);
    router.delete('/user/:id', userController.delete);

    const itemController = new ItemController();
    router.get('/item', itemController.getAll);
    router.get('/item/:id', itemController.getOne);
    router.post('/item', itemController.create);
    router.put('/item', itemController.update);
    router.delete('/item/:id', itemController.delete);

    const ItemWithRenterController = new ItemController();
    router.get('/itemWithRenter', ItemWithRenterController.getAll);
    router.get('/itemWithRenter/:id', ItemWithRenterController.getOne);
    router.post('/itemWithRenter', ItemWithRenterController.create);
    router.put('/itemWithRenter', ItemWithRenterController.update);
    router.delete('/itemWithRenter/:id', ItemWithRenterController.delete);

    return router;
}