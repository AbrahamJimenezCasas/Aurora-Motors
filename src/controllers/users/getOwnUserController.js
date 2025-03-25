import { ownUserService } from "../../services/users/ownUserService.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getOwnUserController = async (req, res, next) => {
    try {
        // Obtenemos el id por la request
        const { id } = req.usuario;

        // Comprobamos si hay id
        if (!id) {
            throw generateErrorUtils(
                401,
                "USER_NOT_AUTHORIZED",
                "El usuario no está autorizado"
            );
        }

        // Buscamos el usuario
        const usuario = await ownUserService(id);

        // Devolvemos el usuario
        res.status(200).json({
            status: "ok",
            message: "Usuario encontrado",
            data: { usuario },
        });
    } catch (error) {
        next(error);
    }
};
