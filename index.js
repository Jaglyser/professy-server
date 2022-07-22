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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[Express]: Server is running at https://localhost:${port}`);
});
const dataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client({
        host: '127.0.0.1',
        user: 'postgres',
        database: 'professy',
        password: 'root',
        port: 5432,
    });
    client.connect();
    client.query('SELECT NOW()', (err, res) => {
        console.log(err, res);
        client.end();
    });
    console.log('💾[PostgreSQL] Database connected');
});
dataBase();
