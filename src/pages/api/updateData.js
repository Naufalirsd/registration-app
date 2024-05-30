const { sql } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

async function updateData(req, res) {
    try {
        if (req.method !== "PUT") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const { nama, username, password, role, status } = req.body;
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "Id tidak boleh kosong" });
        }

        // Hash password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const { rows } = await sql`
            UPDATE users_local 
            SET 
                nama = ${nama},
                username = ${username},
                password = ${hashedPassword},
                role = ${role},
                status = ${status}
            WHERE id = ${id}`;

        res.status(200).json({ message: "Success", data: rows });
    } catch (error) {
        console.error("Ada Kesalahan:", error);
        return res.status(500).json({ message: "Terjadi Kesalahan Internal" });
    }
}

export default updateData;
