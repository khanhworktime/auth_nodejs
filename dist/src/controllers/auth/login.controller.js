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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const user_database_1 = __importDefault(require("../../databases/user.database"));
const generateTokens_1 = require("../../utils/generateTokens");
const validatePassword_1 = require("../../utils/validatePassword");
const responseNotFound = {
    status: false,
    message: "User not found or doesn't exist",
};
const responseWrongCertification = {
    status: false,
    message: 'User or password incorrect',
};
const responseSuccess = (tokens) => {
    return {
        status: false,
        message: 'Login success',
        data: tokens,
    };
};
const loginController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = request.body;
        console.log(request.params);
        if (email === undefined || password === undefined)
            return response.sendStatus(400);
        const user = yield user_database_1.default.getUserByEmail(email);
        if (user === null)
            return response.status(404).json(responseNotFound);
        const isPasswordCorrect = yield (0, validatePassword_1.validatePassword)(password, (_a = user.password) !== null && _a !== void 0 ? _a : '');
        if (!isPasswordCorrect)
            return response.status(401).json(responseWrongCertification);
        const tokens = (0, generateTokens_1.generateTokens)(user);
        yield user_database_1.default.updateUser({
            id: user.id,
            refreshToken: tokens.refreshToken,
        });
        return response.status(200).json(responseSuccess(tokens));
    }
    catch (e) {
        console.log(e);
        return response.status(404).json(responseNotFound);
    }
});
exports.loginController = loginController;
