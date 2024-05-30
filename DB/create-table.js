require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {
    const deleteTable = await sql`DROP TABLE IF EXISTS users_local`

    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS users_local (
        id SERIAL PRIMARY KEY,
        nama VARCHAR(30) NOT NULL,
        username VARCHAR(15) NOT NULL UNIQUE,
        password VARCHAR(60) NOT NULL,
        role INT DEFAULT 0 CHECK (role IN (0, 1)),
        status INT DEFAULT 1 CHECK (status IN (0, 1)),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    console.log(createTable)
}

execute();

