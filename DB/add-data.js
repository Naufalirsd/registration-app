require("dotenv").config({path: ".env.development.local"});
const {sql} = require("@vercel/postgres");

async function addData() {
    try {
        const rows = await sql`
            INSERT INTO users_local (nama, password, username)
            VALUES ('Akbar', 'hajimaste', 'AkbarFS')
        `;
        console.log("Data Telah Ditambahkan:", rows);
    } catch (e) {
        console.log(e.message);
    }
}

addData();