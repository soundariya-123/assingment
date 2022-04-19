import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Post } from "../../post/post.entity";
// import { Role } from "../role.enum";

/**
 * DTO (Data Transfer Object) for transfer a data from HTTP 
 * @class UserDTO
 * @author soundariya
 */
export class UserDTO{

    id: number;
 
   
    name: string;
 
    
    password: string; 
    
    created_date: Date;

    display_name:string;

    updated_date: Date;
    // role: Role;
    
    posts: Post[];
}