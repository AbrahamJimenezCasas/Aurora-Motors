import { getPool } from "../../db/getPool.js";

export const updateAceptarRechazarReservaModel = async (reserva) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `UPDATE reservas SET status = ? WHERE id = ?`,
        [reserva.status, reserva.id]
    );

    return result;
};
