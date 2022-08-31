import { RequestHandler } from "express";
import nodemailer from 'nodemailer'
import { config } from "../config";

import promoModel from '../models/promoDiscount'
import { oAuth2Client } from "../services/oAuth2ClientServices";
const { CLIENT_ID, CLEINT_SECRET, REFRESH_TOKEN, OWNER_USER_EMAIL } = config;

export const sendMail: RequestHandler = (req, res) => {
    const { email } = req.body

    async function sendMail() {
        try {
            const accessToken: any = await oAuth2Client.getAccessToken();
            const emailModel = new promoModel({ email })
            const emailSaved = await emailModel.save()

            const transport = nodemailer.createTransport({
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
                html: '<h1 style="color: red;">{color: red tiene este h1}</h1>',
            };

            const result = await transport.sendMail(mailOptions);
            return result;
        } catch (error) {
            return error;
        }
    }

    sendMail()
        .then((result) => res.status(200).send({ result }))
        .catch((error) => res.status(404).send(error.message));

}