import path from "path";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { getPool } from "./getPool.js";
import {
    MYSQL_DATABASE,
    UPLOADS_DIR,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ADMIN_EMAIL,
} from "../../env.js";

import { createPathUtil, deletePathUtil } from "../utils/foldersUtils.js";

const initDB = async () => {
    try {
        const pool = await getPool();

        console.log("Poniendo en uso la base de datos 📑");
        await pool.query(`USE ${MYSQL_DATABASE}`);
        console.log("Base de datos en uso ✅ 📑");

        console.log("Borrando tablas existentes 🗑 📑");
        await pool.query(
            "DROP TABLE IF EXISTS reservas, imagenes, coches, usuarios"
        );
        console.log("Tablas borradas ✅ 📑");

        console.log("Creando tablas de nuevo 📑");

        await pool.query(`CREATE TABLE usuarios (
                id CHAR(36) PRIMARY KEY NOT NULL,
                username VARCHAR(50) UNIQUE NOT NULL,
                nombre VARCHAR(50) DEFAULT NULL,
                apellidos VARCHAR(50) DEFAULT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password CHAR(60) NOT NULL,
                telefono VARCHAR(15) UNIQUE DEFAULT NULL,
                avatar CHAR(40) DEFAULT NULL,
                biografia VARCHAR(256) DEFAULT NULL,
                activado BOOLEAN DEFAULT FALSE,
                premium BOOLEAN DEFAULT FALSE,
                rol ENUM('admin', 'user') DEFAULT 'user',
                registrationCode CHAR(15) DEFAULT NULL,
                recoveryPassCode CHAR(15) DEFAULT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
            )`);

        await pool.query(`CREATE TABLE coches (
                    id CHAR(36) PRIMARY KEY NOT NULL,
                    modelo VARCHAR(100) NOT NULL,
                    caracteristicas TEXT DEFAULT NULL,
                    categoria ENUM (Clase B, Clase C, Clase D, Clase E, Clase F, Clase S) DEFAULT Clase E,
                    precio DECIMAL(10, 2) NOT NULL,
                    descripcion TEXT DEFAULT NULL,
                    disponible BOOLEAN DEFAULT TRUE,
                    adminId CHAR(36) NOT NULL,
                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
                    FOREIGN KEY (adminId) REFERENCES usuarios(id) ON DELETE CASCADE
                )`);

        await pool.query(`CREATE TABLE imagenes (
                id CHAR(36) PRIMARY KEY NOT NULL,
                imagen CHAR(40) DEFAULT NULL,
                cocheId CHAR(36) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (cocheId) REFERENCES coches(id) ON DELETE CASCADE
            )`);

        await pool.query(`CREATE TABLE reservas (
                id CHAR(36) PRIMARY KEY NOT NULL,
                usuarioId CHAR(36) NOT NULL,
                cocheId CHAR(36) NOT NULL,
                date DATE NOT NULL,
                tipo ENUM ("URBANO", "CARRERA") NOT NULL,
                status ENUM ("PENDIENTE", "CONFIRMADA", "CANCELADA") DEFAULT "PENDIENTE",
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (usuarioId) REFERENCES usuarios(id) ON DELETE CASCADE,
                FOREIGN KEY (cocheId) REFERENCES coches(id) ON DELETE CASCADE
            )`);

        console.log("Tablas creadas");

        // Añadir usuario administrador usando datos .env
        const id = crypto.randomUUID();
        const password = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await pool.query(
            `INSERT INTO usuarios (id, username, email, password, activado, rol) VALUES (?, ?, ?, ?, ?, ?);`,
            [id, ADMIN_USERNAME, ADMIN_EMAIL, password, true, "admin"]
        );

        console.log("Usuario administrador creado");

        // Directorio de subidas
        const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);
        // Borramos el directorio uploads y todo su contenido
        console.log("Borrando directorio de subida");
        await deletePathUtil(uploadsDir);
        console.log("Directorio de subida borrado");

        // Crear el directorio uploads y sus subdirectorios users y tweets
        console.log("Creando directorios de subida");
        await createPathUtil(uploadsDir);
        const avatarsDir = path.join(uploadsDir, "avatars");
        await createPathUtil(avatarsDir);
        const articulosDir = path.join(uploadsDir, "articulos");
        await createPathUtil(articulosDir);
        console.log("Directorios de subida creados");

        console.log("Todo ha ido bien");

        process.exit(0);
    } catch (error) {
        console.error("Error al inicializar la base de datos", error);
        process.exit(1);
    }
};

initDB();
