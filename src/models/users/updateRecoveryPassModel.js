import { getPool } from "../../db/getPool.js";

export const updateRecoveryPassModel = async (id, recoveryPass) => {
    // Conectar con la base de datos
    const pool = await getPool();

    // Actualizar el usuario
    const [result] = await pool.query(
        `UPDATE usuarios SET recoveryPassCode = ? WHERE id = ?;`,
        [recoveryPass, id]
    );

    return result;
};
