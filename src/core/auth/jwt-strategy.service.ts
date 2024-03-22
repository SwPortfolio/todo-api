import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../configuration/configuration.interface';
import {AuthModel} from "./auth.model";
import {DatabaseUtil} from "../../shared/database/database.util";
import {PoolConnection} from "mysql2/promise";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
    private connection: PoolConnection;

    constructor(
        private readonly configService: ConfigService,
        private readonly authModel: AuthModel,
        private readonly databaseUtil: DatabaseUtil
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<Configuration['jwt']>('jwt').secret,
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: any) {
        try {
            this.connection = await this.databaseUtil.getDBConnection();

            const token = req.headers['authorization'].split(' ')[1]; // token

            // 회원 토큰 유효성 체크
            // 토큰으로 회원 조회
            const memberTokenSet = await this.authModel.getMemberToken(this.connection, token, payload.memberId);
            if (memberTokenSet.length > 0) {
                const memberToken = memberTokenSet[0];

                payload.memberPkey = memberToken.memberPkey;

                return payload;
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }
}
