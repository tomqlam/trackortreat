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
const house_service_1 = __importDefault(require("@services/house-service"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// **** Variables **** //
// Misc
const { CREATED, OK } = http_status_codes_1.default;
// Paths
const path = '/candy';
// async arrow function that returns promise of string
const getHouses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const houses = yield house_service_1.default.getHouses();
        return houses;
    }
    catch (e) {
        console.log(JSON.stringify(e));
    }
});
// **** Export default **** //
exports.default = {
    path,
    getHouses,
};
