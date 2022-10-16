"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.UserNotFoundError = exports.ValidatorFnError = exports.ParamInvalidError = exports.CustomError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class CustomError extends Error {
    constructor(msg, httpStatus) {
        super(msg);
        this.HttpStatus = http_status_codes_1.default.BAD_REQUEST;
        this.HttpStatus = httpStatus;
    }
}
exports.CustomError = CustomError;
class ParamInvalidError extends CustomError {
    constructor() {
        super(ParamInvalidError.Msg, ParamInvalidError.HttpStatus);
    }
}
exports.ParamInvalidError = ParamInvalidError;
ParamInvalidError.Msg = 'One or more of the required was missing ' +
    'or invalid.';
ParamInvalidError.HttpStatus = http_status_codes_1.default.BAD_REQUEST;
class ValidatorFnError extends CustomError {
    constructor(fnName) {
        super(ValidatorFnError.Msg + fnName, ValidatorFnError.HttpStatus);
    }
}
exports.ValidatorFnError = ValidatorFnError;
ValidatorFnError.Msg = 'Validator function failed. function name: ';
ValidatorFnError.HttpStatus = http_status_codes_1.default.BAD_REQUEST;
class UserNotFoundError extends CustomError {
    constructor() {
        super(UserNotFoundError.Msg, UserNotFoundError.HttpStatus);
    }
}
exports.UserNotFoundError = UserNotFoundError;
UserNotFoundError.Msg = 'A user with the given id does not exists ' +
    'in the database.';
UserNotFoundError.HttpStatus = http_status_codes_1.default.NOT_FOUND;
class UnauthorizedError extends CustomError {
    constructor() {
        super(UnauthorizedError.Msg, UnauthorizedError.HttpStatus);
    }
}
exports.UnauthorizedError = UnauthorizedError;
UnauthorizedError.Msg = 'Login failed';
UnauthorizedError.HttpStatus = http_status_codes_1.default.UNAUTHORIZED;
