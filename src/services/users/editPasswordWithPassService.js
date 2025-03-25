import bcrypt from "bcrypt";
import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { updateUserPasswordModel } from "../../models/users/updateUserPasswordModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editPasswordWithPassService = async (
    email,
    recoveryPass,
    newPassword
) => {
    // Buscamos el usuario en la base de datos
    const usuario = await selectUserByEmailModel(email);

    // Comprobamos que el recoveryPass coincide
    if (!usuario || usuario.recoveryPassCode !== recoveryPass) {
        throw generateErrorUtils(
            400,
            "WRONG_DATA",
            "El email o código de recuperación son incorrectos"
        );
    }

    // Encriptar la nueva contraseña
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Actualizamos la contraseña en la base de datos
    const result = await updateUserPasswordModel(usuario.id, newPasswordHash);

    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            "ERROR_UPDATING_PASSWORD",
            "Error al actualizar la contraseña"
        );
    }

    // Devolvemos el usuario
    delete usuario.recoveryPassCode;
    delete usuario.password;
    return usuario;
};
