"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const verifyTokenMiddleware = (request, response, next) => {
    var _a;
    const authHeader = request.header('Authorization');
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);
    if (token === undefined)
        return response.sendStatus(401);
    try {
        jwt.verify(token, (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : '');
        next();
    }
    catch (e) {
        console.log(e);
        return response.sendStatus(401);
    }
};
exports.verifyTokenMiddleware = verifyTokenMiddleware;
