import { editUserService } from "../../services/users/editUserService.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editUserController = async (req, res, next) => {
    try {
        // Obtenemos el id por la request
        const { id } = req.usuario;

        // Obtenemos los datos actualizados
        const newUserInfo = req.body;

        // Comprobamos que se está enviando info
        if (!newUserInfo) {
            throw generateErrorUtils(
                400,
                "INFO_MISSING",
                "No se han enviado datos para actualizar"
            );
        }

        // Comprobamos que se está enviando el usuario y email (obligatorios)
        if (!newUserInfo.username || !newUserInfo.email) {
            throw generateErrorUtils(
                400,
                "INFO_MISSING",
                "Faltan datos para actualizar"
            );
        }

        // Actualizamos los datos
        const usuario = await editUserService(id, newUserInfo);

        res.status(200).send({
            status: "ok",
            message: "Usuario actualizado",
            data: { usuario },
        });
    } catch (error) {
        next(error);
    }
};
