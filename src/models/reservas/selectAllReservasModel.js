import { getPool } from "../../db/getPool.js";

export const selectAllReservasModel = async () => {
    const pool = await getPool();

    const [reservas] = await pool.query(
        `SELECT R.id AS reservaId, R.usuarioId, R.cocheId, U.nombre, U.apellidos, C.modelo, C.precio, R.createdAt AS fecha
        FROM reservas R
        INNER JOIN coches C
        ON R.cocheId = C.id
        JOIN usuarios U
        ON U.id = R.usuarioId
        ORDER BY R.createdAt DESC`
    );

    return reservas;
};
