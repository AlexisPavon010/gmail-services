"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const route = (0, express_1.Router)();
route.post('/api/sendmail', controllers_1.sendMail);
exports.default = route;
