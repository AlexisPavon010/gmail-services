import { Router } from "express";
import { sendMail } from "../controllers";
import { emailValidator } from "../validators/emailValidator";

const route = Router()

route.post('/api/sendmail', emailValidator, sendMail)

export default route