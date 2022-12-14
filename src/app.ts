import express from "express";
import cors from 'cors'
import path from "path";

import	mailRoutes from './routes/mail.routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

app.use(mailRoutes)

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

export default app