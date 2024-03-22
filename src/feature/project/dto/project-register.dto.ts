import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class ProjectRegisterDto {
    @IsNotEmpty()
    @IsString()
    projectName: string;

    @IsNotEmpty()
    @IsString()
    projectColor: string;

    @IsOptional()
    @IsNumber()
    sort = 0;
}
