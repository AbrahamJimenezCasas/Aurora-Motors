import crypto from "crypto";
import { generateErrorUtils } from "../../utils/helpersUtils.js";
import { sendEmailBrevoUtil } from "../../utils/sendEmailBrevoUtils.js";
import { FRONTEND_HOST } from "../../../env.js";
import { insertReservaModel } from "../../models/reservas/insertReservaModel.js";

export const newReservaService = async (usuario, coche) => {
    // Crear la id para la solicitud
    const id = crypto.randomUUID();
    const usuarioId = usuario.id;
    const cocheId = coche.id;

    // Insertar la solicitud en la base de datos
    const result = await insertReservaModel({ id, usuarioId, cocheId });

    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            "RESERVA_NOT_MADE",
            "No se ha podido realizar la reserva"
        );
    }

    // Enviar el email
    // Destinatario
    const email = usuario.email;
    // Asunto email
    const emailSubject = `Solicitud de compra para tu artículo ${coche.modelo}`;
    // Cuerpo del email
    const emailText = `
        <h2>¡Hola, ${usuario.username}!</h2>
        <p> has hecho una reserva para probar tu coche ${coche.nombre} por ${coche.precio}€</p>
        <p>Puedes cancelar la reserva en cualquier momento aquí:</p>
        <p><a href=${FRONTEND_HOST}/coches/${cocheId}>CancelarReserva</a></p>
        <p>¡No esperes más!</p>
        <p>El equipo de Aurora Motors</p>
        `;
    // Llamar al servicio que envía el email
    await sendEmailBrevoUtil(email, emailSubject, emailText);

    // Devolver la solicitud
    return { id, usuarioId, cocheId };
};
