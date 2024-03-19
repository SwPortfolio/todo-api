import {Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import {ResponseUtil} from "../../shared/response/response.util";
import {AuthGuard} from "@nestjs/passport";
import {ProjectListService} from "./service/project-list.service";

@Controller('project')
export class ProjectController {
    constructor(private readonly responseUtil: ResponseUtil, private readonly projectListService: ProjectListService) {
    }

    @Get('/list')
    @UseGuards(AuthGuard('auth-jwt'))
    async getProjectList(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * project 전체 목록 (삭제된 프로젝트는 제외) 오름차순으로 조회
             * project 별 section 목록 조회
             */
            const { projectList } = await this.projectListService.getProjectList(memberId);

            return this.responseUtil.response(res, 200, '0000', {}, { projectList: projectList });
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    @Get('')
    @UseGuards(AuthGuard('auth-jwt'))
    async getProject(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * project 상세조회
             * project 정보 조회
             */

            return this.responseUtil.response(res, 200, '0000', {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    @Get('/section')
    @UseGuards(AuthGuard('auth-jwt'))
    async getSection(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * section 상세조회
             * section 정보 조회
             */

            return this.responseUtil.response(res, 200, '0000', {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    @Post('/register')
    @UseGuards(AuthGuard('auth-jwt'))
    async createProject(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * project 생성
             *
             */

            return this.responseUtil.response(res, 200, '0000', {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    @Post('/modify')
    @UseGuards(AuthGuard('auth-jwt'))
    async modifyProject(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * project 수정
             * - projectName
             * - projectColor
             * - sort
             */

            return this.responseUtil.response(res, 200, '0000', {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    @Post('/register')
    @UseGuards(AuthGuard('auth-jwt'))
    async createSection(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * section 생성
             *
             */

            return this.responseUtil.response(res, 200, '0000', {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }

    @Post('/modify')
    @UseGuards(AuthGuard('auth-jwt'))
    async modifySection(@Req() req: any, @Res() res: any) {
        try {
            const memberId = req.user.memberId; // 회원 일련 아이디

            /**
             * section 수정
             * - sectionName
             */

            return this.responseUtil.response(res, 200, '0000', {}, {});
        } catch (err) {
            return this.responseUtil.response(res, 500, '9999', {}, {});
        }
    }
}
