import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
@Entity()
export class AuthUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;
}