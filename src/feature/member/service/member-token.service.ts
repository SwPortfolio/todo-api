import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Configuration} from "../../../core/configuration/configuration.interface";
import {PoolConnection} from "mysql2/promise";
import {DatabaseUtil} from "../../../shared/database/database.util";
import {MemberModel} from "../member.model";

@Injectable()
export class MemberTokenService {
    private connection: PoolConnection;
    constructor(
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly databaseUtil: DatabaseUtil,
        private readonly memberModel: MemberModel,
    ) {}

    async memberToken(memberPkey: number, memberId: string): Promise<string> {
        try {
            this.connection = await this.databaseUtil.getDBConnection();

            // 저장된 회원 토큰 삭제
            await this.memberModel.deleteMemberToken(this.connection, memberPkey);

            // jwt 토큰 생성
            const token = await this.jwtSign(memberId);

            // 회원 토큰 테이블에 저장
            await this.memberModel.createMemberToken(this.connection, memberPkey, token);

            return token;
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }

    /**
     * 토큰 생성
     * @param memberId
     */
    async jwtSign(memberId: string): Promise<string> {
        try {
            return await this.jwtService.signAsync(
                { memberId: memberId },
                {
                    secret: this.configService.get<Configuration['jwt']>('jwt').secret,
                },
            );
        } catch (err) {
            throw err;
        }
    }
}
