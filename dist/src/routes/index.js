"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const users_1 = require("./users");
const appRoutes = (0, express_1.Router)();
appRoutes.use(auth_1.authRoutes);
appRoutes.use(users_1.usersRouter);
exports.default = appRoutes;
