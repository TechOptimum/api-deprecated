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
exports.registerRouter = void 0;
const express_1 = require("express");
const database_1 = require("../database");
const bcrypt_1 = require("bcrypt");
const constants_1 = require("../constants");
const generate_1 = require("../helpers/generate");
const router = (0, express_1.Router)();
exports.registerRouter = router;
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (username === null) {
        return res.status(400).json({ error: "Username is required." });
    }
    if (password === null)
        return res.status(400).json({ error: "Password is required" });
    if (email === null)
        return res.status(400).json({ error: "Password is required" });
    const userWithSameEmail = yield database_1.prisma.user.findFirst({
        where: {
            email,
        },
    });
    const userWithSameUsername = yield database_1.prisma.user.findFirst({
        where: {
            username,
        },
    });
    if (userWithSameEmail !== null) {
        return res.status(400).json({
            error: "A User with this email already exists",
        });
    }
    if (userWithSameUsername !== null) {
        return res.status(400).json({
            error: "A User with this username already exists",
        });
    }
    const passwordHash = yield (0, bcrypt_1.hash)(password, constants_1.saltRounds);
    yield database_1.prisma.user.create({
        data: {
            username,
            email,
            password: passwordHash,
        },
    });
    const jwt = (0, generate_1.generateToken)({
        username,
        email,
    });
    return res.status(200).json({
        username,
        token: jwt,
    });
}));
//# sourceMappingURL=register.js.map