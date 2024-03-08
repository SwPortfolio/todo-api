import {Body, Controller, Post, Req, Res} from "@nestjs/common";
import {RegisterDto} from "./dto/register.dto";
import {ResponseUtil} from "../../shared/response/response.util";
import {MemberRegisterService} from "./service/member-register.service";
import {LoginDto} from "./dto/login.dto";
import {MemberLoginService} from "./service/member-login.service";
import {MemberTokenService} from "./service/member-token.service";

@Controller('member')
export class MemberController {
    constructor(
        private readonly responseUtil: ResponseUtil,
        private readonly memberRegisterService: MemberRegisterService,
        private readonly memberLoginService: MemberLoginService,
        private readonly memberTokenService: MemberTokenService,
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
}
