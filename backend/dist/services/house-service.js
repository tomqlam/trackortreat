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
const house_context_1 = __importDefault(require("@context/house-context"));
const getHouses = () => __awaiter(void 0, void 0, void 0, function* () {
    return house_context_1.default.getHouses();
});
const getFilteredHouses = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const localHouses = yield house_context_1.default.getFilteredHouses(filter);
    let validHouseID = {};
    for (let i = 0; i < localHouses.length; i++) {
        const currentHouse = localHouses[i];
        for (let key in filter['candyprefs']) {
            if (filter['candyprefs'][key] && currentHouse.candyflags[key]) {
                validHouseID[currentHouse.houseid] = true;
                continue;
            }
        }
    }
    let validHouses = [];
    for (let key in validHouseID) {
        validHouses.push(localHouses.find(house => String(house.houseid) === key));
    }
    return validHouses;
});
const getDistance = (lat1, lon1, lat2, lon2) => {
    return Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2);
};
const getOptimalPath = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const validHouses = yield getFilteredHouses(filter);
    let curLat = filter.userlatitude;
    let curLong = filter.userlongitude;
    let optimalPath = [];
    const visited = {};
    for (let i = 0; i < validHouses.length; i++) {
        let minDistance = Number.MAX_VALUE;
        let minIndex = -1;
        for (let j = 0; j < validHouses.length; j++) {
            if (visited[j])
                continue;
            const curDistance = getDistance(curLat, curLong, validHouses[j].latitude, validHouses[j].longitude);
            if (curDistance < minDistance) {
                minDistance = curDistance;
                minIndex = j;
            }
        }
        visited[minIndex] = true;
        curLat = validHouses[minIndex].latitude;
        curLong = validHouses[minIndex].longitude;
        optimalPath.push(validHouses[minIndex]);
    }
    return optimalPath;
});
const createHouse = (house) => __awaiter(void 0, void 0, void 0, function* () {
    return house_context_1.default.createHouse(house);
});
// **** Export default **** //
exports.default = {
    getHouses,
    getFilteredHouses,
    createHouse,
    getOptimalPath,
};
