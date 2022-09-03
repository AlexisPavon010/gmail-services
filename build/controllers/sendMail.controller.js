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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../config");
const promoDiscount_1 = __importDefault(require("../models/promoDiscount"));
const oAuth2ClientServices_1 = require("../services/oAuth2ClientServices");
const { CLIENT_ID, CLEINT_SECRET, REFRESH_TOKEN, OWNER_USER_EMAIL } = config_1.config;
const sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const filePath = path_1.default.join(__dirname, '../public/example.html');
        const source = fs_1.default.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars_1.default.compile(source);
        const replacements = {
            username: "Darth Vader"
        };
        const htmlToSend = template(replacements);
        const accessToken = yield oAuth2ClientServices_1.oAuth2Client.getAccessToken();
        const emailModel = new promoDiscount_1.default({ email });
        const emailSaved = yield emailModel.save();
        const transport = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: OWNER_USER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const mailOptions = {
            from: 'test@test123123.com',
            to: email,
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: htmlToSend
        };
        const response = yield transport.sendMail(mailOptions);
        console.log(response);
        res.status(200).send({ ok: true });
    }
    catch (error) {
        console.log(`<------${error}------>`);
        res.status(400).send(error);
    }
});
exports.sendMail = sendMail;
