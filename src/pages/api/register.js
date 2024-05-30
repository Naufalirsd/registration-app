// import dependencies
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

export default async function registerUser(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { nama, username, password } = req.body;

    if (!nama || !username || !password) {
        return res
            .status(400)
            .json({ message: "Nama, username, and password are required" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const result = await sql`
            INSERT INTO users_local (nama, username, password)
            VALUES (${nama}, ${username}, ${hashedPassword})
            RETURNING *
        `;

        return res
            .status(201)
            .json({
                message: "User registered successfully",
                data: result.rows[0],
            });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
