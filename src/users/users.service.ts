import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/users.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { loginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class UsersService {
   
   
    constructor(private userRepo: UsersRepository,
                private jwtService: JwtService) {}

    async register(user: UserDTO): Promise<string> {
        let response:UserDTO;
        try {
            const { password } = user;
            const salt = await bcrypt.genSalt();
            const hasedPassword = await bcrypt.hash(password, salt);
            response = await this.userRepo.save({...user, password: hasedPassword});

            if(response) {
                const message:string =  `User registered successfully by this id:${response.id}`;
                return message;
            } else {
                throw new InternalServerErrorException('Unable to register , please try again later');
            }
        } catch(err) {
            if(err.errno === 1062) {
                throw new ConflictException(`User alredy exist`)
            } 
            throw new InternalServerErrorException(err.message);
        }
    }

    async loginUser(userLogin: loginDTO): Promise<{ token }> {
        try {
            const userVal = await this.userRepo.findOneOrFail({name: userLogin.name});
            if(userVal && await bcrypt.compare(userLogin.password, userVal.password)) {
                const payload: JwtPayload = { name:userVal.name}
                let token = this.jwtService.sign(payload);
               
                return  { token };
            } else {
                throw new UnauthorizedException('Invalid Credential')
            }
           } catch(err) {
                if(err?.status === 401){
                    throw new UnauthorizedException('Invalid Credential')
                }
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
           }
    }
}
