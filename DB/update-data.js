require("dotenv").config({path: ".env.development.local"});

const {sql} = require("@vercel/postgres");

async function execute() {
    try {
        const {rows} = await sql`
        UPDATE users_local
        SET nama = 'Naufal',
            password = 'Nfl',
            username = 'Naufalirsd',
            role = 1,
            status = 1
        WHERE id = 1
        RETURNING *    
        `;
    console.log("Data Telah Diubah:", rows);
    } catch (e) {
        console.log(e.message);
    }
}

execute();