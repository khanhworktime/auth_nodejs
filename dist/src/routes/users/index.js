"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const get_1 = require("./get");
const routes = (0, express_1.Router)();
routes.use(get_1.getAllUserRouter);
exports.usersRouter = routes;
