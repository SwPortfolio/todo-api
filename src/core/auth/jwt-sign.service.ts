import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Configuration} from "../configuration/configuration.interface";

@Injectable()
export class JwtSignService {
    constructor(
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * 토큰 발급
     * @param memberpkey
     * @param campuspkey
     */
    async sign(memberpkey: number, campuspkey: number): Promise<string> {
        try {
            return await this.jwtService.signAsync(
                { memberpkey: memberpkey, campustpkey: campuspkey },
                {
                    secret: this.configService.get<Configuration['jwt']>('jwt').secret,
                },
            );
        } catch (err) {
            throw err;
        }
    }
}
