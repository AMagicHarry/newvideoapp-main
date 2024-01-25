import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // define auth service and extract jwt token from header
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    async validate(payload: any) {

        return {
            id: payload.id,
            role: payload.role,
        };
    }
}
