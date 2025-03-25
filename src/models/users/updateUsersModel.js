import { getPool } from "../../db/getPool.js";

export const updateUsersModel = async (id, info) => {
    // Conectamos con la base de datos
    const pool = await getPool();

    // Realizamos la consulta
    const [result] = await pool.query(
        `UPDATE usuarios SET username = ?, nombre = ?, apellidos = ?, email = ?, telefono = ?, biografia = ? WHERE id = ?`,
        [
            info.username,
            info.nombre,
            info.apellidos,
            info.email,
            info.telefono,
            info.biografia,
            id,
        ]
    );

    // Devolvemos el resultado
    return result;
};
