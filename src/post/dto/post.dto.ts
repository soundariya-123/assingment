import { Users } from "../../users/users.entity";

export class  PostDto{
    id: number;
    title: string;
    description: string;
    created_dat: Date;
    updated_date: Date;
    is_featured: string;
    user:Users;
}