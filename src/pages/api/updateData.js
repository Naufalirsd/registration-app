const {sql} = require("@vercel/postgres");
import bcrypt from "bcrypt";

async function updateData(req, res) {
    try {
        if (req.method !== "PUT") {
            return res.status(405).json({ message: "Metode tidak diizinkan" });
        }

        const { nama, username, password, role, status } = req.body;
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "Id tidak boleh kosong" });
        }

        let updateQuery = sql`UPDATE users_local SET`;
        const updateParams = [];

        if (nama) {
            updateQuery.append(sql` nama = ${nama}`);
            updateParams.push(nama);
        }
        if (username) {
            updateQuery.append(sql`, username = ${username}`);
            updateParams.push(username);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateQuery.append(sql`, password = ${hashedPassword}`);
            updateParams.push(hashedPassword);
        }
        if (role !== undefined) {
            updateQuery.append(sql`, role = ${role}`);
            updateParams.push(role);
        }
        if (status !== undefined) {
            updateQuery.append(sql`, status = ${status}`);
            updateParams.push(status);
        }

        updateQuery.append(sql` WHERE id = ${id}`);

        const { rowCount } = await sql(updateQuery, ...updateParams);

        if (rowCount === 0) {
            return res
                .status(404)
                .json({ message: "Data dengan id tersebut tidak ditemukan" });
        }

        res.status(200).json({ message: "Berhasil" });
    } catch (error) {
        console.error("Ada Kesalahan:", error);
        return res.status(500).json({ message: "Terjadi Kesalahan Internal" });
    }
}

export default updateData;