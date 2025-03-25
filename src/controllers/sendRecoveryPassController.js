import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { editRecoveryPassService } from "../../services/users/editRecoveryPassService.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const sendRecoveryPassController = async (req, res, next) => {
    try {
        // Obtenemos el email de la request
        const { email } = req.body;

        // Comprobamos si el usuario existe
        const usuario = await selectUserByEmailModel(email);
        if (!usuario) {
            throw generateErrorUtils(
                404,
                "USER_NOT_FOUND",
                "El usuario no existe"
            );
        }

        // Llamamos al servico
        const recoveryPass = await editRecoveryPassService(usuario.id, email);

        res.status(201).send({
            status: "ok",
            message: "Código de recuperación enviado con éxito",
            data: { recoveryPass },
        });
    } catch (error) {
        next(error);
    }
};
