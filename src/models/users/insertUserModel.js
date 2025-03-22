import { getPool } from "../../db/getPool.js";

export const insertUserModel = async (user) => {
    const pool = await getPool();

    const {
        id,
        username,
        nombre,
        apellidos,
        email,
        password,
        registrationCode,
    } = user;

    const [result] = await pool.query(
        `INSERT INTO usuarios (id, username, nombre, apellidos, email, password, registrationCode) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, username, nombre, apellidos, email, password, registrationCode]
    );

    return result;
};
