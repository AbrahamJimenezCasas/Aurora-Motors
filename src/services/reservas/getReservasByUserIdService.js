import { selectPhotosByCocheIdModel } from "../../models/photos/selectPhotosByCocheIdModel.js";
import { selectReservasByUserIdModel } from "../../models/reservas/selectReservasByUserIdModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getReservasByUserIdService = async (idUsuario) => {
    const reservas = await selectReservasByUserIdModel(idUsuario);

    for (const reserva of reservas) {
        const fotos = await selectPhotosByCocheIdModel(reserva.cocheId);
        reserva.fotos = fotos;
    }

    if (!reservas || reservas.length === 0) {
        throw generateErrorUtils(
            404,
            "SOLICITUD_NOT_FOUND",
            "No se encontraron solicitudes de compra para el usuario proporcionado"
        );
    }

    return reservas;
};
