"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = void 0;
/**
 * Get a random number between 1 and 1,000,000,000,000
 */
function getRandomInt() {
    return Math.floor(Math.random() * 1000000000000);
}
exports.getRandomInt = getRandomInt;
