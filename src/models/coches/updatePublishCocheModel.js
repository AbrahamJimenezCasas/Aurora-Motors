import { getPool } from "../../db/getPool.js";

export const updatePublishCocheModel = async (id) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `UPDATE coches SET disponible = 1 WHERE id = ?`,
        [id]
    );

    return result;
};
