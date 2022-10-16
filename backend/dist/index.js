"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./pre-start"); // Must be the first import
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const api_1 = __importDefault(require("./routes/api"));
const EnvVars_1 = __importDefault(require("src/configurations/EnvVars"));
const enums_1 = require("src/declarations/enums");
// **** Functions **** //
// const { Pool, Client } = require('pg');
// const client = new Client(process.env.DATABASE_URL);
// // async arrow function
// const getCandies = async (): Promise<ICandy[]> => {
//   // connect using postgresql
//   await client.connect();
//   const res = await client.query('SELECT * FROM candies');
//   console.log(res.rows);
//   return res;
// }
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
// **** Init express **** //
const app = (0, express_1.default)();
// **** Set basic express settings **** //
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Add APIs
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
// app.get('/api', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });
app.use('/api', api_1.default);
// app.use('/api', async (req: Request, res: Response, next: NextFunction) => { Bas(req, res, next); });
app.get('/api', (req, res) => {
    res.send('Welcome to the API!');
    // getCandies();
});
// Show routes called in console during development
if (EnvVars_1.default.nodeEnv === enums_1.NodeEnvs.Dev) {
    console.log("Running on Dev");
    app.use((0, morgan_1.default)('dev'));
}
// Security
if (EnvVars_1.default.nodeEnv === enums_1.NodeEnvs.Production) {
    console.log("Running on Prod");
    app.use((0, helmet_1.default)());
}
// **** Add API routes **** //
exports.default = app;
