import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";
import { SECRET } from "../../../env.js";
export const loginUserService = async (email, password) => {
    const usuario = await selectUserByEmailModel(email);

    let checkPassword = false;

    if (usuario) {
        checkPassword = await bcrypt.compare(password, usuario.password);
    }

    if (!usuario || !checkPassword) {
        throw generateErrorUtils(
            400,
            "USER_NOT_FOUND",
            "El usuario o la contraseña no son correctos"
        );
    }

    if (!usuario.activado) {
        throw generateErrorUtils(
            400,
            "USER_NOT_ACTIVE",
            "El usuario no está activo. Revisa tu email"
        );
    }

    const payload = {
        id: usuario.id,
        rol: usuario.rol,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "2h" });

    return token;
};
