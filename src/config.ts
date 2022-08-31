import dotenv from 'dotenv'

dotenv.config()

export const config = {
    PORT: process.env.PORT || 3001,
    CLIENT_ID: process.env.CLIENT_ID,
    CLEINT_SECRET: process.env.CLEINT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    MONGO_DATABASE: process.env.DATABASE_URL || 'localhost',
    OWNER_USER_EMAIL: process.env.OWNER_USER_EMAIL,
}