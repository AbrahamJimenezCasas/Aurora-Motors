import { getPool } from "../../db/getPool.js";

export const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM usuarios WHERE email = ?`, [
        email,
    ]);

    return user[0];
};
