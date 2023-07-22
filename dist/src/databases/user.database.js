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
const dbo_database_1 = __importDefault(require("./dbo.database"));
class UserDBO extends dbo_database_1.default {
    constructor() {
        super();
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbo_database_1.default.getInstance().from('users').select();
            if (data !== null)
                return data;
            console.log(error);
            return [];
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbo_database_1.default.getInstance()
                .from('users')
                .select()
                .eq('id', userId)
                .single();
            if (data !== null)
                return data;
            console.log(error);
            return null;
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbo_database_1.default.getInstance()
                .from('users')
                .select('id, email, password')
                .eq('email', email)
                .single();
            if (data !== null)
                return data;
            console.log(error);
            return null;
        });
    }
    static getUserByRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbo_database_1.default.getInstance()
                .from('users')
                .select('id, email, refreshToken')
                .eq('refreshToken', refreshToken)
                .single();
            if (data !== null)
                return data;
            console.log(error);
            return null;
        });
    }
    static createUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbo_database_1.default.getInstance()
                .from('users')
                .insert({ email, password })
                .select('id, email, created_at')
                .single();
            if (data !== null)
                return data;
            console.log(error);
            return null;
        });
    }
    static updateUser({ id, email, password, refreshToken, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield dbo_database_1.default.getInstance()
                .from('users')
                .update({ email, password, refreshToken })
                .eq('id', id)
                .select()
                .single();
            if (data !== null)
                return data;
            console.log(error);
            return null;
        });
    }
}
exports.default = UserDBO;
