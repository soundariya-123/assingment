import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "../users.repository";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class  JwtStratagy extends PassportStrategy(Strategy) {
    constructor(private uerRepo: UsersRepository) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload) {
        try{
            let response = await this.uerRepo.findOneOrFail({name: payload.name});
            return response;
        }catch(err) {
            throw new HttpException(err.message, HttpStatus.UNAUTHORIZED)
        }
    }
}