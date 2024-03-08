import {Module} from "@nestjs/common";
import {MemberController} from "./member.controller";
import {MemberRegisterService} from "./service/member-register.service";
import {MemberModel} from "./member.model";
import {PasswordService} from "./service/password.service";
import {MemberTokenService} from "./service/member-token.service";
import {MemberLoginService} from "./service/member-login.service";

@Module({
    imports: [],
    controllers: [MemberController],
    providers: [MemberRegisterService, MemberLoginService, PasswordService, MemberTokenService, MemberModel],
    exports: [],
})
export class MemberModule {}
