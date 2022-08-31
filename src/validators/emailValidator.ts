import { check } from "express-validator"
import { validateResults } from "../middlewares/validateResults"

export const emailValidator = [
    check('email', 'El email es incorrecto y obligatorio').isEmail(),
    validateResults
]