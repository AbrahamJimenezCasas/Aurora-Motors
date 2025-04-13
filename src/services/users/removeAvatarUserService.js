import path from "path";
import { UPLOADS_DIR } from "../../../env.js";
import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";
import { deletePhotoUtil } from "../../utils/photoUtils.js";
import { deleteAvatarUserModel } from "../../models/users/deleteAvatarUserModel.js";
import { deletePathUtil } from "../../utils/foldersUtils.js";

export const removeAvatarUserService = async (id) => {
    const usuario = await selectUserByIdModel(id);

    if (!usuario.avatar) {
        throw generateErrorUtils(
            404,
            "AVATAR_NOT_FOUND",
            "No se ha encontrado el avatar del usuario"
        );
    }

    const result = await deleteAvatarUserModel(id);

    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            "USER_NOT_UPDATED",
            "El avatar no se ha borrado"
        );
    }

    const usuarioPath = `src/${UPLOADS_DIR}/avatars/${id}`;
    const avatarPath = path.join(process.cwd(), usuarioPath, usuario.avatar);
    await deletePhotoUtil(avatarPath);
    await deletePathUtil(usuarioPath);

    delete usuario.password;
    return { ...usuario, avatar: "NULL" };
};
