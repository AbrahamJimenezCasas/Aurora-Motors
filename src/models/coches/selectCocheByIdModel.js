import { getPool } from "../../db/getPool.js";

export const selectCocheByIdModel = async (id) => {
    const pool = await getPool();

    const [coche] = await pool.query(`SELECT * FROM coches WHERE id = ?`, [id]);

    return coche[0];
};
