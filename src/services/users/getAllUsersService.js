import { selectAllusersModel } from "../../models/users/selectAllUsersModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

// obtenemos todos los usuarios de la base de datos y si no hay, devolvemos un error
export const getAllUsersService = async () => {
    const usuarios = await selectAllusersModel();

    if (!usuarios.length) {
        // si users.length es 0
        throw generateErrorUtils(
            404,
            "NO_USERS_FOUND",
            "No se han encontrado usuarios"
        );
    }

    return usuarios;
};
