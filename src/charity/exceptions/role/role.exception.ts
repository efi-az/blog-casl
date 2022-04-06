import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleAlreadyExist extends HttpException {
    constructor() {
        super('نقش تکراری است', HttpStatus.CONFLICT) 
    }
}

export class RoleNotFound extends HttpException {
    constructor() {
        super('نقش پیدا نشد', HttpStatus.BAD_REQUEST)
    }
}