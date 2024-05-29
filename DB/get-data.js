require("dotenv").config({path : ".env.development.local"});
const {sql} = require("@vercel/postgres");

async function getData() {
    try {
        const {rows} = await sql`
        SELECT * FROM users_local
        `;
        console.log("All Data:", rows);
    } catch (e) {
        console.log(e.message);
    }
}

getData();
