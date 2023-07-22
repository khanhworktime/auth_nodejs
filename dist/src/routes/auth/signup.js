"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const router = (0, express_1.Router)();
router.post('/signup', auth_1.signupController);
exports.signupRouter = router;
