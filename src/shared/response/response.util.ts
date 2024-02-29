import {Injectable} from "@nestjs/common";

@Injectable()
export class ResponseUtil {
    private res: any;
    private statusCode: number;
    private resCode: string;
    private body: any;

    public static readonly MESSAGES: object = {
        // status 200
        '0000': { kor: '성공' },
        '0001': { kor: '이메일이 중복됩니다.' },

        // status 500
        '9999': { kor: '서버오류' },
        '9998': { kor: 'DB 오류' },
    }

    getMessageByCode(resCode: string): object {
        return ResponseUtil.MESSAGES[resCode];
    }

    isEmptyObject(message: object): boolean {
        return Object.keys(message).length === 0 && message.constructor === Object;
    }

    response(
        res: Response,
        statusCode: number,
        resCode: string,
        message: object,
        body: object,
    ): Response {
        this.res = res;
        this.statusCode = statusCode;
        this.resCode = resCode;
        this.body = body;
        message =
            this.isEmptyObject(message) === false
                ? message
                : this.getMessageByCode(resCode);
        return this.res
            .status(this.statusCode)
            .json({ resCode: this.resCode, message: message, body: this.body });
    }
}
