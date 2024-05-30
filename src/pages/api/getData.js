const {sql} = require("@vercel/postgres");

async function getData(req, res) {
    try {
        if (req.method !== "GET") {
            return res
                .status(405)
                .json({message: "Method tidak diperbolehkan"});
        }

        const {rows} = await sql`SELECT * FROM users_local`;

        res.status(200).json({message: "Success", data: rows});
    } catch(error) {
        console.log("Ada Error", error);
        return res.status(500).json({message: "Terjadi Error," })
    }
}

export default getData;