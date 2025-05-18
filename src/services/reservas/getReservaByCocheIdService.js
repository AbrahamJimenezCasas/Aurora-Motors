import { selectReservasByCocheIdModel } from "../../models/reservas/selectReservasByCocheIdModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getReservaByCocheIdService = async (id) => {
    const reservas = await selectReservasByCocheIdModel(id);

    if (!reservas) {
        throw generateErrorUtils(
            404,
            "RESERVAS_NOT_FOUND",
            "No se encontraron resrevas para el coche"
        );
    }

    return reservas;
};
