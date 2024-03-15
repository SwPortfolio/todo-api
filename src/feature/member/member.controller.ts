import {Body, Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import {RegisterDto} from "./dto/register.dto";
import {ResponseUtil} from "../../shared/response/response.util";
import {MemberRegisterService} from "./service/member-register.service";
import {LoginDto} from "./dto/login.dto";
import {MemberLoginService} from "./service/member-login.service";
import {MemberTokenService} from "./service/member-token.service";
import {AuthGuard} from "@nestjs/passport";
import {MemberInfoService} from "./service/member-info.service";

@Controller('member')
export class MemberController {
    constructor(
        private readonly responseUtil: ResponseUtil,
        private readonly memberRegisterService: MemberRegisterService,
        private readonly memberLoginService: MemberLoginService,
        private readonly memberTokenService: MemberTokenService,
        private readonly memberInfoService: MemberInfoService,
    ) {}

    /**
     * 회원가입
     * @param req
     * @param res
     * @param registerDto
     */
    @Post('/register')
    async register(@Req() req: any, @Res() res: any, @Body() registerDto: RegisterDto) {
        try {

            // 회원 저장
            const { resCode } = await this.memberRegisterService.register(registerDto);

            return this.responseUtil.response(res, 200, resCode, {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    /**
     * 로그인
     * @param req
     * @param res
     * @param loginDto
     */
    @Post('/login')
    async login(@Req() req: any, @Res() res: any, @Body() loginDto: LoginDto) {
        try {
            const { resCode, memberPkey, memberId, email, nickname } = await this.memberLoginService.login(loginDto);

            if (resCode !== '0000') {
                // 로그인 실패
                return this.responseUtil.response(res, 200, resCode, {}, {});
            } else {
                // 로그인 성공
                // jwt 토큰 생성 및 저장
                const token = await this.memberTokenService.memberToken(memberPkey, memberId);

                return this.responseUtil.response(
                    res,
                    200,
                    resCode,
                    {},
                    {
                        token: token,
                        memberId: memberId,
                        email: email,
                        nickname: nickname,
                    }
                );
            }
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    /**
     * 회원 정보 조회
     * @param req
     * @param res
     */
    @Get('/info')
    @UseGuards(AuthGuard('auth-jwt'))
    async memberInfo(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            // 회원 상세조회
            const { member } = await this.memberInfoService.getInfo(memberId);

            return this.responseUtil.response(res, 200, '0000', {}, { member: member });
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }
}
