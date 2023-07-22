"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRouter = void 0;
const express_1 = require("express");
const refreshToken_controller_1 = require("../../controllers/auth/refreshToken.controller");
const router = (0, express_1.Router)();
router.post('/refreshToken', refreshToken_controller_1.refreshTokenController);
exports.refreshTokenRouter = router;
