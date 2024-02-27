import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../configuration/configuration.interface';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<Configuration['jwt']>('jwt').secret,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
