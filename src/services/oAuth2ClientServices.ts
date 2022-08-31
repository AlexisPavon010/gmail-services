import { google } from 'googleapis'

import { config } from '.././config'
const { CLIENT_ID, CLEINT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = config;

export const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
})