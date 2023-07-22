"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserRouter = void 0;
const express_1 = require("express");
const users_1 = require("../../controllers/users");
const auth_1 = require("../../middlewares/auth/auth");
const router = (0, express_1.Router)();
router.get('/users', auth_1.verifyTokenMiddleware, users_1.getAllUsersController);
exports.getAllUserRouter = router;
