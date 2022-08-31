import { RequestHandler } from "express";
import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import path from "path";
import fs from 'fs'

import { config } from "../config";
import promoModel from '../models/promoDiscount'
import { oAuth2Client } from "../services/oAuth2ClientServices";
const { CLIENT_ID, CLEINT_SECRET, REFRESH_TOKEN, OWNER_USER_EMAIL } = config;

export const sendMail: RequestHandler = (req, res) => {
    const { email } = req.body


    const filePath = path.join(__dirname, '../public/example.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        username: "Darth Vader"
    };
    const htmlToSend = template(replacements);

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
                html: htmlToSend
            };

            return await transport.sendMail(mailOptions);
        } catch (error) {
            return error;
        }
    }

    sendMail()
        .then((result) => res.status(200).send({ result }))
        .catch((error) => res.status(404).send(error.message));

}