import { selectReservaByIdModel } from "../../models/reservas/selectReservaByIdModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getReservaByIdService = async (id) => {
    const reserva = await selectReservaByIdModel(id);

    if (!reserva) {
        throw generateErrorUtils(
            404,
            "RESERVA_NOT_FOUND",
            "Reserva no encontrada"
        );
    }

    return reserva;
};
