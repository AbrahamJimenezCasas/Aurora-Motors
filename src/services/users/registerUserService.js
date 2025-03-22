import randomstring from "randomstring";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateErrorUtils } from "../../utils/helpersUtils.js";
import { selectUserByUsernameModel } from "../../models/users/selectUserByUsernameModel.js";
import { selectUserByEmailModel } from "../../models/users/selectUserByEmailModel.js";
import { insertUserModel } from "../../models/users/insertUserModel.js";
import { FRONTEND_HOST } from "../../../env.js";
import { sendEmailBrevoUtil } from "../../utils/sendEmailBrevoUtil.js";

export const registerUserService = async (
    username,
    nombre,
    apellidos,
    email,
    password
) => {
    const checkUser = async (username, email) => {
        if (await selectUserByUsernameModel(username)) {
            throw generateErrorUtils(
                400,
                "USERNAME_EXISTS",
                "El nombre de usuario ya existe"
            );
        }

        if (await selectUserByEmailModel(email)) {
            throw generateErrorUtils(
                400,
                "EMAIL_EXISTS",
                "El email ya existe, prueba con otro o inicia sesion"
            );
        }
    };

    await checkUser(username, email);

    const id = crypto.randomUUID();

    const registrationCode = randomstring.generate(10);

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
        id,
        username,
        nombre,
        apellidos,
        email,
        password: hashedPassword,
        registrationCode,
    };

    const result = await insertUserModel(newUser);

    if (!result || result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            "DB_ERROR",
            "no se pudo completar el registro del usuario"
        );
    }

    const emailSubject = "Activacion de cuenta";

    const emailText = `<h2> ¡Bienvenido a Aurora Motors, ${nombre}!<h2>
    <p> Ya casi eres parte de la mejor comunidad de coches del mundo, aqui es donde encontraras Tu Camino, y Tu Leyenda, aqui no solo se venden coches, se vende tu historia.</p>
    <p>Para activar tu cuenta, haz click en el siguiente enlace:</p>
    <p><a href="${FRONTEND_HOST}/validar/${registrationCode}">Activar cuenta</a></p>
    <p>¡No esperes más!<p>
    <p>Si no has solicitado el registro de una cuenta, puedes ignorar este correo.</p>
    <p>Equipo de Aurora Motors</p>`;

    await sendEmailBrevoUtil(email, emailSubject, emailText);

    return { id, username, nombre, apellidos, email, registrationCode };
};
