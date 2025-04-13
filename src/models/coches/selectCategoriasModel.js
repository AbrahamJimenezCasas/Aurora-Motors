import { getPool } from "../../db/getPool.js";

export const selectCategoriasModel = async () => {
    const pool = await getPool();

    const [categorias] = await pool.query(
        `SELECT DISTINCT categoria FROM coches`
    );

    return categorias;
};
