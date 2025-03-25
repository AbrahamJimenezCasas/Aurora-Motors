import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getUserByIdService = async (id) => {
    const usuario = await selectUserByIdModel(id);

    if (!usuario) {
        throw generateErrorUtils(
            404,
            "USER_NOT_FOUND",
            "El usuario no encontrado o inactivo"
        );
    }

    delete usuario.password;
    return usuario;
};
