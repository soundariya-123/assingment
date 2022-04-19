import { Post } from "../post/post.entity";
import { Column , CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";


/**
 * Users entity for create table columns
 * @author soundariya
 */
@Entity()
export class Users{
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column({unique:true})
    name: string;
 
 
    @Column()
    password: string;

    @Column()
    display_name:string;

    @CreateDateColumn()
    created_date: Date;
    
    @UpdateDateColumn()
    updated_date: Date;

    @OneToMany(() => Post, posts => posts.user )
    posts: Post[]
 
}


