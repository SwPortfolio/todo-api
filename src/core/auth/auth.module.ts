import {Global, Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import { Configuration } from "../configuration/configuration.interface";
import {jwtStrategy} from "./jwt-strategy.service";
import {AuthModel} from "./auth.model";

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<Configuration['jwt']>('jwt').secret,
                signOptions: { expiresIn: '90d' },
            })
        })
    ],
    providers: [jwtStrategy, AuthModel],
    exports: [],
})
export class AuthModule {}
