require("dotenv").config({path: ".env.development.local"});

const {sql} = require("@vercel/postgres");

async function execute() {
    try {
        const {rows} = await sql`
        DELETE FROM users_local
        RETURNING *
        `;
        console.log("Data telah Dihapus:", rows);
    } catch (e) {
        console.log(e.message);
    }
}

execute();