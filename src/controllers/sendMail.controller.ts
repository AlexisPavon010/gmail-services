import { RequestHandler } from "express";

export const sendMail: RequestHandler = (req, res) => {
    res.status(200).send({ ok: true })
}