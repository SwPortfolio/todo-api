import {Module} from "@nestjs/common";
import {MemberController} from "./member.controller";
import {MemberRegisterService} from "./service/member-register.service";
import {MemberModel} from "./member.model";

@Module({
    imports: [],
    controllers: [MemberController],
    providers: [MemberRegisterService, MemberModel],
    exports: [],
})
export class MemberModule {}
