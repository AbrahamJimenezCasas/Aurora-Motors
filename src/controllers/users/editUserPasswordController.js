import { editUserPasswordService } from "../../services/users/editUserPasswordService.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editUserPasswordController = async (req, res, next) => {
    try {
        // Obtenemos el id por la request
        const { id } = req.usuario;

        // Obtenemos los datos de password
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            throw generateErrorUtils(400, "DATA_MISSING", "Faltan datos");
        }

        // Actualizamos los datos
        const usuario = await editUserPasswordService(
            id,
            oldPassword,
            newPassword
        );

        res.status(200).send({
            status: "ok",
            message: "Contraseña actualizada correctamente",
            data: { usuario },
        });
    } catch (error) {
        next(error);
    }
};
