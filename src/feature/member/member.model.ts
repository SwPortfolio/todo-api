import {Injectable} from "@nestjs/common";
import {DatabaseUtil} from "../../shared/database/database.util";
import {PoolConnection} from "mysql2/promise";

@Injectable()
export class MemberModel {
    constructor(private readonly databaseUtil: DatabaseUtil) {
    }

    /**
     * 회원 저장
     * @param connection
     * @param memberId
     * @param email
     * @param password
     * @param nickname
     */
    async createMember(connection: PoolConnection, memberId: string, email: string, password: string, nickname: string) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
                insert into member (
                    memberId, email, password, nickname, regDate, deleteDate, deleteYn
                ) values (
                    ?, ?, ?, ?, now(), '1999-01-01 00:00:00', 'N'
                )
            `,
            [memberId, email, password, nickname]
        )
    }

    /**
     * memberId 중복 확인
     * @param connection
     * @param memberId
     */
    async isValidMemberId(connection: PoolConnection, memberId: string) {
        return await this.databaseUtil.dbQuery(
            connection,
            `select memberPkey from member where memberId=?`,
            [memberId],
        );
    }

    /**
     * 이메일 중복 조회
     * @param connection
     * @param email
     */
    async isValidEmail(connection: PoolConnection, email: string) {
        return await this.databaseUtil.dbQuery(
            connection,
            `select memberPkey from member where email=?`,
            [email],
        );
    }

    /**
     * 회원 로그인 email
     * @param connection
     * @param email
     */
    async getMemberLogin(connection: PoolConnection, email: string) {
        return await this.databaseUtil.dbQuery(
            connection,
            `select * from member where email=? and deleteYn='N';`,
            [email],
        );
    }

    /**
     * 회원 토큰 삭제
     * @param connection
     * @param memberPkey
     */
    async deleteMemberToken(connection: PoolConnection, memberPkey: number) {
        return await this.databaseUtil.dbQuery(
            connection,
            `delete from memberToken where memberPkey=?`,
            [memberPkey],
        );
    }

    /**
     * 회원 토큰 저장
     * @param connection
     * @param memberPkey
     * @param token
     */
    async createMemberToken(connection: PoolConnection, memberPkey: number, token: string) {
        return await this.databaseUtil.dbQuery(
            connection,
            `
                insert into memberToken (
                    memberPkey, accessToken, refreshToken, expireDate, regDate      
                ) values (
                    ?, ?, '', date_add(now(), interval 90 day), now()
                )
            `,
            [memberPkey, token],
        );
    }
}
