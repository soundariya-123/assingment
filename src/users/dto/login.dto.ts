import { IsEmail, IsNotEmpty } from "class-validator";

export class loginDTO {
    @IsNotEmpty({message: 'Email Id should not be empty'})
    @IsEmail({message: 'Enter valid email id'})
    name:string;

    @IsNotEmpty({message: 'Password should not be empty'})
    password:string;
}