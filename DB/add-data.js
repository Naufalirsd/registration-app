require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

async function execute() {
    try {
        // Hash password using bcrypt
        const password = "hajimaste";
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data with hashed password
        const rows = await sql`
            INSERT INTO users_local (nama, password, username)
            VALUES ('Akbar', ${hashedPassword}, 'AkbarFS')
        `;
        console.log("Data Telah Ditambahkan:", rows);
    } catch (e) {
        console.log(e.message);
    }
}

execute();
