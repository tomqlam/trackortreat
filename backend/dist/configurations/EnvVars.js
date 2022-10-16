"use strict";
/* eslint-disable node/no-process-env */
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    nodeEnv: ((_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : ''),
    port: ((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 0),
    cookieProps: {
        key: 'ExpressGeneratorTs',
        secret: ((_c = process.env.COOKIE_SECRET) !== null && _c !== void 0 ? _c : ''),
        options: {
            httpOnly: true,
            signed: true,
            path: ((_d = process.env.COOKIE_PATH) !== null && _d !== void 0 ? _d : ''),
            maxAge: Number((_e = process.env.COOKIE_EXP) !== null && _e !== void 0 ? _e : 0),
            domain: ((_f = process.env.COOKIE_DOMAIN) !== null && _f !== void 0 ? _f : ''),
            secure: (process.env.SECURE_COOKIE === 'true'),
        },
    },
    databaseUrl: ((_g = process.env.DATABASE_URL) !== null && _g !== void 0 ? _g : ''),
    jwt: {
        secret: ((_h = process.env.JWT_SECRET) !== null && _h !== void 0 ? _h : ''),
        exp: ((_j = process.env.COOKIE_EXP) !== null && _j !== void 0 ? _j : ''), // exp at the same time as the cookie
    },
};
