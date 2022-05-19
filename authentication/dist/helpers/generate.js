"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function generateToken(data) {
    return (0, jsonwebtoken_1.sign)(data, process.env.TOKEN_SECRET);
}
exports.generateToken = generateToken;
//# sourceMappingURL=generate.js.map