import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";

import { router } from "./routes/index.js";

import { UPLOADS_DIR } from "../env.js";

export const server = express();

server.use(express.json());

server.use(fileUpload());

const uploadsDir = path.join(process.cwd(), `src/${UPLOADS_DIR}`);

server.use("/uploads", express.static(uploadsDir));

server.use(cors());

server.use(router);

/* ERRORS */

// ERROR 404

server.use((req, res, next) => {
    const resourcePath = req.path;
    const error = new Error(`No se encontró el recurso: ${resourcePath}`);
    error.httpStatus = 404;
    error.code = "RESOURCE_NOT_FOUND";
    next(error);
});

// GESTION DE ERRORES

server.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        httpStatus: error.httpStatus || 500,
        status: "ERROR!!!",
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message,
    });
});
