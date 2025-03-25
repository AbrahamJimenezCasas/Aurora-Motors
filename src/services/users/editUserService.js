import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { selectUserByUsernameModel } from "../../models/users/selectUserByUsernameModel.js";
import { updateUsersModel } from "../../models/users/updateUsersModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editUserService = async (id, newUserInfo) => {
    // Creamos un objeto con la info limpia para evitar undefineds
    const cleanUserInfo = {
        username: newUserInfo.username ?? null,
        nombre: newUserInfo.nombre ?? null,
        apellidos: newUserInfo.apellidos ?? null,
        email: newUserInfo.email ?? null,
        telefono: newUserInfo.telefono ?? null,
        biografia: newUserInfo.biografia ?? null,
    };

    // Verificar que otro usuario no tenga ese username y email(excluido own)
    const sameUsername = await selectUserByUsernameModel(
        cleanUserInfo.username
    );
    if (sameUsername && sameUsername.id !== id) {
        throw generateErrorUtils(
            400,
            "USERNAME_ALREADY_EXISTS",
            "El nombre de usuario ya existe"
        );
    }

    const sameEmail = await selectUserByEmailModel(cleanUserInfo.email);
    if (sameEmail && sameEmail.id !== id) {
        throw generateErrorUtils(
            400,
            "EMAIL_ALREADY_EXISTS",
            "El email ya existe"
        );
    }

    // Actualizamos los datos
    const result = await updateUsersModel(id, cleanUserInfo);

    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            "USER_NOT_UPDATED",
            "El usuario no se ha actualizado"
        );
    }

    // Devolvemos datos actualizados
    return { id, ...cleanUserInfo };
};
