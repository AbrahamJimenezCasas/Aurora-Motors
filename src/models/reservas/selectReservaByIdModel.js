import { getPool } from "../../db/getPool.js";

export const selectReservaByIdModel = async (id) => {
    const pool = await getPool();

    const [reserva] = await pool.query(
        `SELECT R.id, R.usuarioId, R.cocheId, R.date, R.tipo, R.status, C.modelo, C.precio,
        FROM reservas R
        JOIN usuarios U
        ON U.id = R.usuarioId
        JOIN coches C
        ON C.id = R.cocheId
        WHERE R.id = ?`,
        [id]
    );

    return reserva[0];
};
