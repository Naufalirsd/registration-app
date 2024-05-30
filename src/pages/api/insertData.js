import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

async function insertData(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Metode tidak diizinkan" });
        }

        const { nama, username, password } = req.body;

        if (!nama || !username || !password) {
            return res
                .status(400)
                .json({ message: "Nama, username, dan password dibutuhkan" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const result = await sql`
            INSERT INTO users_local (nama, username, password)
            VALUES (${nama}, ${username}, ${hashedPassword})
        `;

        return res
            .status(201)
            .json({ message: "Pendaftaran pengguna berhasil" });
    } catch (error) {
        if (error.code === "23505") {
            // unique_violation
            return res.status(400).json({ message: "Username sudah ada" });
        }
        console.error("Ada Kesalahan:", error);
        return res.status(500).json({ message: "Terjadi Kesalahan Internal" });
    }
}

export default insertData;