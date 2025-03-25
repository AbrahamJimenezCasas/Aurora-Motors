import { getPool } from "../../db/getPool.js";

export const deleteAvatarUserModel = async (id) => {
    // Conectamos con la base de datos
    const pool = await getPool();

    // Realizamos la consulta
    const [result] = await pool.query(
        `UPDATE usuarios SET avatar = NULL WHERE id = ?`,
        [id]
    );

    // Devolvemos el resultado
    return result;
};
