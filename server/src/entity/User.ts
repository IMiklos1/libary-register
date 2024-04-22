import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Item } from "./Item"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    idCard: string;

    @Column()
    status: string;

    @OneToMany(type => Item, item => item.renterId)
    items: Item[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }
}
