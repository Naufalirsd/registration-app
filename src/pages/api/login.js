// import dependencies
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// handler function for login endpoint
async function login(req, res) {
    try {
        // Check if the request method is POST
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        // Extract username and password from request body
        const { username, password } = req.body;

        // Validate username and password
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password are required" });
        }

        // Retrieve user data from the database based on the username
        const { rows } =
            await sql`SELECT * FROM users_local WHERE username = ${username}`;

        // Check if user exists
        if (rows.length === 0) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }

        // Verify password
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { username: user.username, role: user.role },
            process.env.JWT_SECRET
        );

        // Set token as cookie
        res.setHeader("Set-Cookie", `token=${token}; HttpOnly`);

        // Return success response with token
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default login;
