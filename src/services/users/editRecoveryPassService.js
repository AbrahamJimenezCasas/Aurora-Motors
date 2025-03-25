import randomstring from "randomstring";
import { updateRecoveryPassModel } from "../../models/users/updateRecoveryPassModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";
import { sendEmailBrevoUtil } from "../../utils/sendEmailBrevoUtils.js";

export const editRecoveryPassService = async (id, email) => {
    // Creamos el código de recuperacion
    const recoveryPass = randomstring.generate(10);

    // Actualizamos en la base de datos
    const result = await updateRecoveryPassModel(id, recoveryPass);
    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            "ERROR_DB",
            "No se pudo actualizar el código de recuperación"
        );
    }

    // Enviar email de confirmacion
    // Asunto email
    const emailSubject = "Recupera tu contraseña de AURORA MOTORS";
    // Cuerpo del email
    const emailText = `
        <h2>¡Recupera la contraseña para ${email}!</h2>
        <p>Has solicitado una recuperación de contraseña y puedes utilizar el siguiente código de recuperación para crear una nueva contraseña</p>
        <p>Código de recuperación: ${recoveryPass}</p>
        <p>Si no has solicitado la recuperación de la contraseña, ignora este email.</p>
        <p>El equipo de AURORA MOTORS</p>
        `;
    // Llamar al servicio que envía el email
    await sendEmailBrevoUtil(email, emailSubject, emailText);

    return recoveryPass;
};
