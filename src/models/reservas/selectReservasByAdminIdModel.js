import { getPool } from "../../db/getPool.js";

export const selectReservasByAdminIdModel = async (id) => {
    const pool = await getPool();

    const [reservas] = await pool.query(
        `SELECT R.id AS reservaId, R.status, U.Username, C.modelo AS coche, C.id AS cocheId, R.usuarioId, C.precio, R.createdAt AS fecha
        FROM reservas R
        JOIN coches C
        ON C.id = R.cocheId
        JOIN usuarios U
        ON U.id = R.usuarioId
        WHERE R.usuarioId = ? AND R.status = "PENDIENTE"`,
        [id]
    );

    return reservas;
};
