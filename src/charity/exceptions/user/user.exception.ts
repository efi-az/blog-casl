import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAleardyExist extends HttpException {
    constructor() {
        super('کاربر تکراری است', HttpStatus.CONFLICT) 
    }
}

export class UserNotFound extends HttpException {
    constructor() {
        super('کاربر پیدا نشد', HttpStatus.BAD_REQUEST)
    }
}

export class PasswordNotCorrect extends HttpException {
    constructor() {
        super('رمز عبور اشتباه است', HttpStatus.BAD_REQUEST)
    }
}