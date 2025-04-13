import { getPool } from "../../db/getPool.js";

export const insertPhotoModel = async (id, cocheId, imagen) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `INSERT INTO imagenes (id, imagen, cocheId) VALUES (?, ?, ?)`,
        [id, imagen, cocheId]
    );

    return result;
};
