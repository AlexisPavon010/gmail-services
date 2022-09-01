"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const emailValidator_1 = require("../validators/emailValidator");
const route = (0, express_1.Router)();
route.post('/api/sendmail', emailValidator_1.emailValidator, controllers_1.sendMail);
exports.default = route;
