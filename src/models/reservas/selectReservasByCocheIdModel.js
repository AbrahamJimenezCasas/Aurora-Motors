import { getPool } from "../../db/getPool.js";

export const selectReservasByCocheIdModel = async (cocheId) => {
    const pool = await getPool();

    const [reservas] = await pool.query(
        `SELECT R.id, R.status, R.usuarioId U.username AD usuarioSolicitud
        FROM reservas R
        JOIN coches C
        ON C.id = R.cocheId
        JOIN usuarios U
        ON U.id = R.usuarioId
        WHERE C.id = ?;`,
        [cocheId]
    );

    return reservas;
};
