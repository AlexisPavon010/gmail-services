import app from "./app"

import { config } from "./config"
import './services/db'

app.listen(config.PORT, () => {
    console.log(`server on port ${config.PORT}`)
})