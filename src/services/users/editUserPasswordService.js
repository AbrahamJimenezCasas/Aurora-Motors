import bcrypt from "bcrypt";
import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { updateUserPasswordModel } from "../../models/users/updateUserPasswordModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editUserPasswordService = async (id, oldPassword, newPassword) => {
    // Buscamos el usuario en la base de datos
    const usuario = await selectUserByIdModel(id);

    // Comprobar que la contraseña old coincide
    const passwordsMatch = await bcrypt.compare(oldPassword, usuario.password);
    if (!passwordsMatch) {
        throw generateErrorUtils(
            400,
            "WRONG_PASSWORD",
            "La contraseña proporcionada es incorrecta"
        );
    }

    // Encriptar la nueva contraseña
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Actualizamos la contraseña en la base de datos
    const result = await updateUserPasswordModel(id, newPasswordHash);

    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            "ERROR_UPDATING_PASSWORD",
            "Error al actualizar la contraseña"
        );
    }

    // Devolvemos el usuario
    delete usuario.password;
    return usuario;
};
