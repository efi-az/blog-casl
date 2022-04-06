import { HttpException, HttpStatus } from "@nestjs/common";

export class PermissionAlreadyExist extends HttpException {
    constructor() {
        super('نقش تکراری است', HttpStatus.CONFLICT) 
    }
}

export class PermissionNotFound extends HttpException {
    constructor() {
        super('مجوز یافت نشد', HttpStatus.BAD_REQUEST)
    }
}