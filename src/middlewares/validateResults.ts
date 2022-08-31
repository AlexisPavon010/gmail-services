import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const validateResults: RequestHandler = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error: any) {
    res.status(403);
    res.send(error)
  }
}