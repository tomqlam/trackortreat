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
Object.defineProperty(exports, "__esModule", { value: true });
// **** Functions **** //
const { Pool, Client } = require('pg');
const client = new Client(process.env.DATABASE_URL);
client.connect();
// dummy function that returns 10 after a 1 second timeout
const getDummyCandies = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([]);
        }, 1000);
    });
});
const getCandies = () => __awaiter(void 0, void 0, void 0, function* () {
    // connect using postgresql
    const res = yield client.query('SELECT * FROM candies');
    // const res = await getDummyCandies();
    console.log(res.rows);
    return res.rows;
});
// **** Export default **** //
exports.default = {
    getCandies,
};
