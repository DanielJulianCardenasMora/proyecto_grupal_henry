const PORT = process.env.PORT || 3001

const EMAILER_HOST = process.env.EMAILER_HOST;
const EMAILER_PORT = process.env.EMAILER_PORT;
const EMAILER_USER = process.env.EMAILER_USER;
const EMAILER_PASSWORD = process.env.EMAILER_PASSWORD;

const DB_USER = process.env.DB_USER || process.env.LOCAL_DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD || process.env.LOCAL_DB_PASSWORD
const DB_NAME = process.env.DB_NAME || process.env.LOCAL_DB_NAME
const DB_PORT = process.env.DB_PORT || process.env.LOCAL_DB_PORT
const DB_HOST = process.env.DB_HOST || process.env.LOCAL_DB_HOST
const HOST = process.env.HOST || process.env.LOCAL_HOST

module.exports = {
    PORT,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
    DB_HOST,
    HOST,
    EMAILER_HOST,
    EMAILER_PORT,
    EMAILER_USER,
    EMAILER_PASSWORD,
}