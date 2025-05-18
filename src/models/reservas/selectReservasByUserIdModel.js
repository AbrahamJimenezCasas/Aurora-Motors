import { getPool } from "../../db/getPool.js";

export const selectReservasByUserIdModel = async (idUsuario) => {
    const pool = await getPool();

    const reservas = await pool.query(
        `SELECT R.id, R.status, R.cocheId, R.usuarioId, C.modelo, C.precio, R.createdAt AS fecha FROM reservas R INNER JOIN coches C ON R.cocheId = C.id 
        WHERE R.usuarioId = ?
        ORDER BY R.createdAt DESC;`
    );

    const [result] = await pool.query(reservas, [idUsuario]);

    return result;
};
