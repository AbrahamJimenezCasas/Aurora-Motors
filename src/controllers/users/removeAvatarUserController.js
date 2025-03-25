import { removeAvatarUserService } from "../../services/users/removeAvatarUserService.js";

export const removeAvatarUserController = async (req, res, next) => {
    try {
        // Obtenemos el id por la request
        const { id } = req.usuario;

        // Llamamos al service
        const usuario = await removeAvatarUserService(id);

        res.status(200).send({
            status: "ok",
            message: "Avatar borrado",
            data: { usuario },
        });
    } catch (error) {
        next(error);
    }
};
