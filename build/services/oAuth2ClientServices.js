"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuth2Client = void 0;
const googleapis_1 = require("googleapis");
const config_1 = require(".././config");
const { CLIENT_ID, CLEINT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = config_1.config;
exports.oAuth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLEINT_SECRET, REDIRECT_URI);
exports.oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});
