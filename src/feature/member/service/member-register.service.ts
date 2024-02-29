import {Injectable} from "@nestjs/common";
import {PoolConnection} from "mysql2/promise";
import {DatabaseUtil} from "../../../shared/database/database.util";
import {RegisterDto} from "../dto/register.dto";
import {MemberModel} from "../member.model";
import { v4 as uuid4} from 'uuid';
import * as crypto from "crypto";

@Injectable()
export class MemberRegisterService {
    private connection: PoolConnection;
    constructor(private readonly databaseUtil: DatabaseUtil, private readonly memberModel: MemberModel) {}

    /**
     * 회원가입
     * @param registerDto
     */
    async register(registerDto: RegisterDto): Promise<{ resCode: string }> {
        try {
            this.connection = await this.databaseUtil.getDBConnection();

            await this.connection.beginTransaction(); // transaction 시작

            // 회원 ID 생성 (중복체크 필수)
            const memberId = await this.isValidMemberId();

            // 이메일 중복체크
            const isValid = await this.isValidEmail(registerDto.email);
            if (!isValid) {
                // 이메일이 중복됨.
                return { resCode: '0001' };
            } else {
                // 비밀번호 암호화
                const password = this.hashPassword(registerDto.password);

                // 회원 저장
                await this.memberModel.createMember(this.connection, memberId, registerDto.email, password, registerDto.nickname);
            }

            await this.connection.commit();

            return { resCode: '0000' };
        } catch (err) {
            await this.connection.rollback();

            throw err;
        } finally {
            this.connection.release();
        }
    }

    /**
     * memberId 생성
     */
    generatorMemberId(): string {
        try {
            let memberId = '';
            let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let index: number;

            for (let i = 0; i < 15; i++) {
                index = Math.floor(Math.random() * characters.length);
                memberId += characters.charAt(index);
                characters = characters.substring(0, index) + characters.substring(index + 1);
            }

            return memberId;
        } catch (err) {
            throw err;
        }
    }

    /**
     * memberId 중복체크
     */
    async isValidMemberId(): Promise<string> {
        try {
            let memberId = '';
            while(true) {
                // memberId 생성 (max length 50)
                memberId = this.generatorMemberId();

                // memberId 중복체크
                const memberSet = await this.memberModel.isValidMemberId(this.connection, memberId);
                if (memberSet.length === 0) {
                    break;
                }
            }
            return memberId;
        } catch (err) {
            throw err;
        }
    }

    /**
     * 이메일 중복체크
     * @param email
     */
    async isValidEmail(email: string): Promise<boolean> {
        try {
            // 이메일 중복체크
            const memberSet = await this.memberModel.isValidEmail(this.connection, email);

            return memberSet.length === 0;
        } catch (err) {
            throw err;
        }
    }

    /**
     * 비밀번호 암호화
     * @param password
     */
    hashPassword(password: string): string {
        const salt: string = uuid4().replaceAll('-', '');

        return crypto.createHash('sha512').update(password + salt).digest('hex') + ':' + salt;
    }
}
