import { Router } from "express";
import { sendMail } from "../controllers";

const route = Router()

route.post('/api/sendmail', sendMail)

export default route