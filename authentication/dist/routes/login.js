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
exports.loginRouter = void 0;
const express_1 = require("express");
const database_1 = require("../database");
const bcrypt_1 = require("bcrypt");
const generate_1 = require("../helpers/generate");
const router = (0, express_1.Router)();
exports.loginRouter = router;
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email == null)
        return res.status(400).json({ error: "Email is required" });
    if (password == null)
        return res.status(400).send({ error: "Password in required" });
    const user = yield database_1.prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (user === null)
        return res.status(400).json({ error: "User not found" });
    const isMatch = yield (0, bcrypt_1.compare)(password, user.password);
    if (isMatch === false) {
        return res.status(400).json({ error: "Incorrect Password!" });
    }
    const jwt = (0, generate_1.generateToken)({
        username: user.username,
        email: user.email,
    });
    return res.status(200).json({
        username: user.username,
        token: jwt,
    });
}));
//# sourceMappingURL=login.js.map