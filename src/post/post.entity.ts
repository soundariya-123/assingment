import { Users } from "../users/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class  Post{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_dat: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @Column()
    is_featured: string;

    @ManyToOne(() => Users, (user) => user.posts , {eager:true, cascade: true, onDelete : "CASCADE"})
    user: Users;
}