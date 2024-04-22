import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import {User} from "./User"

@Entity()
export class Item{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    type: string;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    procurementDate: Date;

    @Column()
    status: string;

    @Column()
    renterId: string;

    // @ManyToOne(() => User, user => user.items)
    // renter: User;

    @Column()
    startRent: Date;

}