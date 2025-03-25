import { editAvatarUserService } from "../../services/users/editAvatarUserService.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editAvatarUserController = async (req, res, next) => {
    try {
        // Obtenemos el id por la request
        const { id } = req.usuario;

        // Obtenemos el avatar de la request
        const { avatar } = req.files;

        if (!avatar) {
            throw generateErrorUtils(
                400,
                "FILES_MISSING",
                "Es necesario un avatar para actualizar"
            );
        }

        // Llamamos al service
        const usuario = await editAvatarUserService(id, avatar);

        res.status(200).send({
            status: "ok",
            message: "Avatar actualizado",
            data: { usuario },
        });
    } catch (error) {
        next(error);
    }
};
