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
exports.signupController = void 0;
const user_database_1 = __importDefault(require("../../databases/user.database"));
const hashPassword_1 = require("../../utils/hashPassword");
const responseMissingField = {
    status: false,
    message: 'Some required fields are missing',
};
const responseUserExisted = {
    status: false,
    message: 'User is existed',
};
const responseSuccess = (user) => {
    return {
        status: false,
        message: 'User registered success',
        data: user,
    };
};
const signupController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    try {
        if (email === undefined || password === undefined)
            return response.status(401).json(responseMissingField);
        const userCheck = yield user_database_1.default.getUserByEmail(email);
        if (userCheck !== null)
            return response.status(401).json(responseUserExisted);
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
        const newUser = yield user_database_1.default.createUser(email, hashedPassword);
        if (newUser !== null)
            return response.status(200).json(responseSuccess(newUser));
        return response.sendStatus(500);
    }
    catch (e) {
        console.log(e);
        return response.status(500);
    }
});
exports.signupController = signupController;
