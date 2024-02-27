import {Controller, Get, Post, Req, Res} from "@nestjs/common";

@Controller('member')
export class MemberController {
    constructor() {
    }

    /**
     * 회원가입
     * @param req
     * @param res
     */
    @Post('/register')
    async register(@Req() req: any, @Res() res: any) {
        try {
            return res.status(200).json({resCode: '0000', message: '회원가입 성공', body: {}});
        } catch (err) {
            return res.status(200).json({resCode: '0000', message: '', body: {}});
        }
    }
}
