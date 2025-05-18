import { generateErrorUtils } from "../utils/helpersUtils.js";

export const isOwnerMiddleware = async (req, res, next) => {
    try {
        const loggedUserId = req.usuario.id;

        const cocheOwnerId = req.coche.userId;

        if (loggedUserId !== cocheOwnerId) {
            throw generateErrorUtils(
                403,
                "NOT_AUTHORIZED",
                "No tienes permiso para acceder a este recurso"
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};
