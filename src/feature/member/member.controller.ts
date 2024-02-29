import {Body, Controller, Post, Req, Res} from "@nestjs/common";
import {RegisterDto} from "./dto/register.dto";
import {ResponseUtil} from "../../shared/response/response.util";
import {MemberRegisterService} from "./service/member-register.service";

@Controller('member')
export class MemberController {
    constructor(private readonly responseUtil: ResponseUtil, private readonly memberRegisterService: MemberRegisterService) {
    }

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
}
