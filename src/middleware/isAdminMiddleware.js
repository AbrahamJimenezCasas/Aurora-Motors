import { generateErrorUtils } from "../utils/helpersUtils.js";

export const checkIsAdminRol = async (req, res, next) => {
    try {
        if (req.user.rol !== "admin") {
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
