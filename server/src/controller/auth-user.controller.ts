import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { AuthUser } from "../entity/AuthUser";
//import jwt from '../../node_modules/jsonwebtoken';
//import bcrypt from '../../node_modules/bcrypt/';

export class AuthUserController extends Controller {
    repository = AppDataSource.getRepository(AuthUser);
    bcrypt = require('bcrypt');
    jwt = require('jsonwebtoken');
    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as AuthUser);
            delete entity.id

            //const insertedEntity = await this.repository.save(entity);

            entity.password = await this.bcrypt.hash(entity.password, 12);

            await this.repository.save(entity);

            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    login = async (req, res) => {
        try {
            const user = await this.repository.findOne({
                where: { email: req.body.email },
                select: ['id', 'password']
            });
            
            if (!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }
    
            const passwordMatches = await this.bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }
            
            const token = this.jwt.sign({ id: user.id }, 'mySecretKey', { expiresIn: '2w' });

            res.json({ accessToken: token });
        } catch (err) {
            this.handleError(res, err);
        }
    };
}