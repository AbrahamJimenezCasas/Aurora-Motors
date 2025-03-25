import { getPool } from "../../db/getPool.js";

export const updateUserPasswordModel = async (id, newPassword) => {
    // Conectamos con la base de datos
    const pool = await getPool();

    // Realizamos la consulta
    const [result] = await pool.query(
        `UPDATE usuarios SET password = ? WHERE id = ?`,
        [newPassword, id]
    );

    // Devolvemos el resultado
    return result;
};
