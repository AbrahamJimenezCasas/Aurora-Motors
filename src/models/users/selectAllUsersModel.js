import { getPool } from "../../db/getPool.js";

export const selectAllusersModel = async () => {
    // Conexión con la base de datos
    const pool = await getPool();

    // Consulta para obtener todos los usuarios
    const [usuarios] = await pool.query(
        `SELECT U.id, U.username, U.nombre, U.apellidos, U.email, U.password, U.avatar, U.biografia, U.rol, U.activado, U.premium, U.createdAt AS fechaRegistro, R.date, R.tipo, R.status, C.modelo, C.precio, I.imagen,
        FROM usuarios U
        JOIN reservas R
        ON U.id = R.usuarioId
        JOIN coches C
        ON R.cocheId = C.id
        JOIN imagenes I
        ON C.id = I.cocheId;`
    );

    // Devolver los usuarios
    return usuarios;
};
