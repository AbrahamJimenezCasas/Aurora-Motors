import { updateAceptarRechazarReservaModel } from "../../models/reservas/updateAceptarRechazarReservaModel.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editAceptarRechazarReservasService = async (reserva) => {
    const result = await updateAceptarRechazarReservaModel(reserva);

    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            "RESERVA_NOT_UPDATED",
            "La reserva no se ha actualizado"
        );
    }

    return reserva;
};
