import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Exclude } from "class-transformer";
import {Role} from "./Role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
      unique: true
    })
    email: string;

    @Column({ select: false })
    @Exclude()
    password: string

    @Column({
      default: true
    })
    isActive: boolean;
    
    @OneToOne(() => Role)
    @JoinColumn()
    role: Role

}
