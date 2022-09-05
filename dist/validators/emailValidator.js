"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidator = void 0;
const express_validator_1 = require("express-validator");
const validateResults_1 = require("../middlewares/validateResults");
exports.emailValidator = [
    (0, express_validator_1.check)('email', 'El email es obligatorio o incorrecto').isEmail(),
    validateResults_1.validateResults
];
