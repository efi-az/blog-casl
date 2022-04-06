import { HttpException, HttpStatus } from "@nestjs/common";

export class BlogAlreadyExist extends HttpException {
    constructor() {
        super('وبلاگ تکراری است', HttpStatus.CONFLICT) 
    }
}

export class BlogNotFound extends HttpException {
    constructor() {
        super('وبلاگ پیدا نشد', HttpStatus.BAD_REQUEST)
    }
}