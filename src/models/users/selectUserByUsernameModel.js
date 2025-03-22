import { getPool } from "../../db/getPool.js";

export const selectUserByUsernameModel = async (username) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `SELECT * FROM usuarios WHERE username = ?`,
        [username]
    );

    return user[0];
};
