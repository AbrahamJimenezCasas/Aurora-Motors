import { getPool } from "../../db/getPool.js";

export const insertCocheModel = async (
    id,
    adminId,
    modelo,
    categoria,
    precio,
    descripcion
) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `INSERT INTO coches (id, adminId, modelo, categoria, precio, descripcion) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, adminId, modelo, categoria, precio, descripcion]
    );

    return result;
};
