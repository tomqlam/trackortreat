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
// @ts-ignore
const candy_routes_1 = __importDefault(require("./candy-routes"));
const house_routes_1 = __importDefault(require("./house-routes"));
const express_1 = require("express");
// **** Init **** //
const apiRouter = (0, express_1.Router)();
const candyRouter = (0, express_1.Router)();
const houseRouter = (0, express_1.Router)();
candyRouter.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Time: ', Date.now());
    next();
}));
candyRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield candy_routes_1.default.getCandies());
}));
houseRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield house_routes_1.default.getHouses());
}));
apiRouter.use('/candy', candyRouter);
apiRouter.use('/house', houseRouter);
// async express router use
// apiRouter.use('/candy', async (req: Request, res: Response, next: NextFunction) => { candyRouter(req, res, next); });
// **** Export default **** //
exports.default = apiRouter;
