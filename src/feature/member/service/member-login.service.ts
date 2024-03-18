import {Injectable} from "@nestjs/common";
import {PoolConnection} from "mysql2/promise";
import {DatabaseUtil} from "../../../shared/database/database.util";
import {MemberModel} from "../member.model";
import {LoginDto} from "../dto/login.dto";
import {PasswordService} from "./password.service";

@Injectable()
export class MemberLoginService {
    private connection: PoolConnection;

    constructor(
        private readonly databaseUtil: DatabaseUtil,
        private readonly memberModel: MemberModel,
        private readonly passwordService: PasswordService
    ) {}

    async login(loginDto: LoginDto) {
        try {
            this.connection = await this.databaseUtil.getDBConnection();

            // email로 회원 조회
            const memberSet = await this.memberModel.getMemberLogin(this.connection, loginDto.email);
            if (memberSet.length === 1) {
                const member = memberSet[0]; // 조회한 회원

                // 비밀번호 일치여부 체크
                if (this.passwordService.passwordCheck(member.password, loginDto.password)) {
                    // 비밀번호 일치
                    return {
                        resCode: '0000',
                        memberPkey: member.memberPkey,
                        memberId: member.memberId,
                        email: member.email,
                        nickname: member.nickname,
                    }
                } else {
                    // 비밀번호 불일치
                    return { resCode: '0003' }
                }
            } else {
                // 회원가입 해야함
                return { resCode: '0002' }
            }
        } catch (err) {
            throw err;
        } finally {
            this.connection.release();
        }
    }
}
