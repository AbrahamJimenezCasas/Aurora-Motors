import { getUserByIdService } from "../../services/users/getUsersByIdService.js";

// para obtener la id de usuario y dar el ok
export const getUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtenemos el ID de la URL

        const usuario = await getUserByIdService(id);

        res.status(200).send({
            status: "Ok",
            message: "Usuario encontrado",
            data: { usuario },
        });
    } catch (error) {
        next(error);
    }
};
