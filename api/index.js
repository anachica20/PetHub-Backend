"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("../src/config/data-source");
const app_1 = __importDefault(require("../src/app"));
dotenv_1.default.config();
let initialized = false;
async function handler(req, res) {
    try {
        if (!initialized) {
            await (0, data_source_1.initializeDataSource)();
            initialized = true;
            console.log("✅ Database connected (Vercel)");
        }
        return (0, app_1.default)(req, res);
    }
    catch (error) {
        console.error("❌ Server error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
//# sourceMappingURL=index.js.map