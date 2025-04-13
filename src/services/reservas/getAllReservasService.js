import { selectPhotosByCocheIdModel } from "../../models/photos/selectPhotosByCocheIdModel.js";
import { selectAllReservasModel } from "../../models/reservas/selectAllReservasModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getAllReservasService = async () => {
    const reservas = await selectAllReservasModel();

    for (const reserva of reservas) {
        const imagenes = await selectPhotosByCocheIdModel(reserva.cocheId);
        reserva.imagenes = imagenes;
    }

    if (!reservas) {
        throw generateErrorUtils(
            404,
            "NO_RESERVAS_FOUND",
            "No se han encontrado las reservas"
        );
    }

    return reservas;
};
