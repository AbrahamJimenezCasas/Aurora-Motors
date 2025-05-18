import { SECRET } from "../../env.js";
import { generateErrorUtils } from "../utils/helpersUtils.js";
import {
    checkExtractTokenUtils,
    verifyTokenPayloadUtils,
} from "../utils/tokenUtils.js";

export const authUserMiddleware = async (req, res, next) => {
    try {
        // Cogemos el token del header
        const { authorization } = req.headers;

        // Comprobamos si existe el token
        if (!authorization) {
            throw generateErrorUtils(
                401,
                "TOKEN_MISSING",
                "Falta el token en los headers"
            );
        }

        // Verificar y extraer el token
        const token = checkExtractTokenUtils(authorization);

        // Extraer el payload
        const payload = verifyTokenPayloadUtils(token, SECRET);

        // Guardar el payload en req, con esto añadimos la info del usuario(id y role) a la request
        req.usuario = payload;

        // Continuar
        next();
    } catch (error) {
        next(error);
    }
};
