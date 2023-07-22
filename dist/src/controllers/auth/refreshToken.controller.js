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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const generateTokens_1 = require("../../utils/generateTokens");
const user_database_1 = __importDefault(require("../../databases/user.database"));
const jwt = __importStar(require("jsonwebtoken"));
const responseNotFound = {
    status: false,
    message: "Refresh token not found or doesn't exist",
};
const responseSuccess = (tokens) => {
    return {
        status: false,
        message: 'Token refreshed',
        data: tokens,
    };
};
const refreshTokenController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { refreshToken } = request.body;
    if (refreshToken === undefined || refreshToken === null)
        return response.status(400).json(responseNotFound);
    try {
        const user = yield user_database_1.default.getUserByRefreshToken(refreshToken);
        if (user === null)
            return response.status(401).json(responseNotFound);
        jwt.verify(refreshToken, (_a = process.env.JWT_REFRESH_TOKEN_SECRET_KEY) !== null && _a !== void 0 ? _a : '');
        const tokens = (0, generateTokens_1.generateTokens)(user);
        yield user_database_1.default.updateUser({
            id: user.id,
            refreshToken: tokens.refreshToken,
        });
        return response.status(200).json(responseSuccess(tokens));
    }
    catch (e) {
        console.log(e);
        return response.status(401).json(responseNotFound);
    }
});
exports.refreshTokenController = refreshTokenController;
