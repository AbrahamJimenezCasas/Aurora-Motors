import { getPool } from "../../db/getPool.js";

export const insertReservaModel = async (reserva) => {
    // Conectamos con la base de datos
    const pool = await getPool();

    // Realizamos la consulta
    const [result] = await pool.query(
        `INSERT INTO reservas (id, usuarioId, cocheId,) VALUES (?, ?, ?)`,
        [reserva.id, reserva.usuarioId, reserva.cocheId]
    );

    // Devolvemos el resultado
    return result;
};
