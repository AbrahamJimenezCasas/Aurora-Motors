import path from "path";
import { UPLOADS_DIR } from "../../../env.js";
import { selectUserByIdModel } from "../../models/users/selectUserByIdModel.js";
import { updateAvatarUserModel } from "../../models/users/updateAvatarUserModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";
import { deletePhotoUtil, savePhotoUtil } from "../../utils/photoUtils.js";

export const editAvatarUserService = async (id, avatarFile) => {
    const usuario = await selectUserByIdModel(id);

    const usuarioPath = `src/${UPLOADS_DIR}/avatars/${id}`;

    const avatar = await savePhotoUtil(usuarioPath, avatarFile, 200);

    if (usuario.avatar) {
        const avatarPath = path.join(
            process.cwd(),
            usuarioPath,
            usuario.avatar
        );
        await deletePhotoUtil(avatarPath);
    }

    const result = await updateAvatarUserModel(id, avatar);

    if (result.affectedRows === 0) {
        throw generateErrorUtils(
            500,
            "AVATAR_NOT_UPDATED",
            "El avatar no se ha actualizado"
        );
    }

    delete usuario.password;
    return { ...usuario, avatar: avatar };
};
