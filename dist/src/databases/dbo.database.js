"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
class DBO {
    constructor() { }
    static getInstance() {
        var _a, _b;
        return (0, supabase_js_1.createClient)((_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : '', (_b = process.env.DATABASE_KEY) !== null && _b !== void 0 ? _b : '', {
            auth: {
                persistSession: false,
            },
        });
    }
}
exports.default = DBO;
