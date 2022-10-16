"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const candy_service_1 = __importDefault(require("@services/candy-service"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// **** Variables **** //
// Misc
const { CREATED, OK } = http_status_codes_1.default;
// Paths
const path = '/candy';
// async arrow function that returns promise of string
const getCandies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candies = yield candy_service_1.default.getCandies();
        return candies;
    }
    catch (e) {
        console.log(JSON.stringify(e));
    }
});
// **** Export default **** //
exports.default = {
    path,
    getCandies,
};
