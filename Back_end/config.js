const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER || "root"
const DB_PASSWORD = process.env.DB_PASSWORD || "29demarzo"
const DB_NAME = process.env.DB_NAME || "wearfashion"
const DB_PORT = process.env.DB_PORT || 5432

module.exports = {
    PORT,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
}