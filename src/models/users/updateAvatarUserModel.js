import { getPool } from "../../db/getPool.js";

export const updateAvatarUserModel = async (id, avatar) => {
    // Conectamos con la base de datos
    const pool = await getPool();

    // Realizamos la consulta
    const [result] = await pool.query(
        `UPDATE usuarios SET avatar = ? WHERE id = ?`,
        [avatar, id]
    );

    // Devolvemos el resultado
    return result;
};
