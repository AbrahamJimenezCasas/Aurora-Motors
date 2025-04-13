import { getPool } from "../../db/getPool.js";

export const updateCocheModel = async (id, info) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `UPDATE coches SET modelo = ?, categoria = ?, precio = ?, descripcion = ? WHERE id = ?`,
        [info.modelo, info.categoria, info.precio, info.descripcion, id]
    );

    return result;
};
