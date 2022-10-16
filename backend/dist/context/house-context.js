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
const getHouses = () => __awaiter(void 0, void 0, void 0, function* () {
    // connect using postgresql
    const res = yield client.query('SELECT * FROM houses');
    return res.rows;
});
const getFilteredHouses = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    // connect using postgresql
    let queryString = `SELECT * FROM houses
                    WHERE (
                      3959 * acos (
                      cos ( radians(${filter.userlatitude}) )
                      * cos( radians( CAST(houses.latitude as FLOAT)) )
                      * cos( radians( CAST(houses.longitude as FLOAT)) - radians(${filter.userlongitude}) )
                      + sin( radians(${filter.userlatitude}) )
                      * sin( radians( CAST(houses.latitude as FLOAT)) )
                    ) < ${filter.radius});`;
    const res = yield client.query(queryString);
    return res.rows;
});
const createHouse = (house) => __awaiter(void 0, void 0, void 0, function* () {
    // connect using postgresql
    // pool.query('SELECT * FROM table where username=$1 and password=$2', [username, password], (error, results) => {
    let queryString = `INSERT INTO houses (houseaddress, latitude, longitude, candyflags, hascandy, haslargecandy, openbowl) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    try {
        yield client.query(queryString, [house.houseaddress, house.latitude, house.longitude, house.candyflags, house.hascandy, house.haslargecandy, house.openbowl]);
        return true;
    }
    catch (e) {
        console.log(JSON.stringify(e));
        return false;
    }
});
// **** Export default **** //
exports.default = {
    getHouses,
    getFilteredHouses,
    createHouse,
};
