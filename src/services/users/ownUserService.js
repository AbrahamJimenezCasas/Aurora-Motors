import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";

export const ownUserService = async (id) => {
    // Comprobamos si existe el usuario
    const usuario = await selectUserByIdModel(id);

    /*     // Si no existe, lanzar un error. Si se llego a este punto, el usuario existe porque está logueado
    if (!user) {
        throw generateErrorUtils(404, "USER_NOT_FOUND", "El usuario no existe");
    } */

    delete usuario.password;
    return usuario;
};
