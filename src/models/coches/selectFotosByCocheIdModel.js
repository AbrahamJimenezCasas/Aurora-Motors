import { getPool } from "../../db/getPool.js";

export const selectFotosByCocheIdModel = async (cocheId) => {
    const pool = await getPool();

    const [imagenes] = await pool.query(
        `SELECT imagen FROM imagenes WHERE cocheId = ?`,
        [cocheId]
    );

    return imagenes;
};
