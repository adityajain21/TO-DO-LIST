"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use('/node_modules', express_1.default.static('node_modules'));
app.use('/', express_1.default.static('app'));
app.listen(3000, function () {
    console.log('Express server running at http://127.0.0.1:3000');
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
//# sourceMappingURL=index.js.map