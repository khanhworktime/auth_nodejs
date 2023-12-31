"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config = (0, express_1.default)();
config.use((0, cors_1.default)());
config.use(express_1.default.json());
config.use(body_parser_1.default.urlencoded({ extended: true }));
config.use(body_parser_1.default.json());
exports.default = config;
