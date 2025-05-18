import { selectPhotosByCocheIdModel } from "../../models/photos/selectPhotosByCocheIdModel.js";
import { selectReservasByAdminIdModel } from "../../models/reservas/selectReservasByAdminIdModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getReservasByAdminIdService = async (id) => {
    const reservas = await selectReservasByAdminIdModel(id);

    for (const reserva of reservas) {
        const fotos = await selectPhotosByCocheIdModel(reserva.cocheId);
        reserva.fotos = fotos;
    }

    if (!reservas) {
        throw generateErrorUtils(
            404,
            "SOLICITUDES_NOT_FOUND",
            "No se encontraron Reservas para las pruebas pedidas por este usuario"
        );
    }

    return reservas;
};
