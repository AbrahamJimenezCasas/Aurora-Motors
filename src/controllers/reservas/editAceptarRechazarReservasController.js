import { editAceptarRechazarReservasService } from "../../services/reservas/editAceptarRechazarReservasService.js";
import { getReservaByIdService } from "../../services/reservas/getReservaByIdService.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const editAceptarRechazarReservasController = async (req, res, next) => {
    try {
        const { id_res } = req.params;
        const { estado } = req.body;

        if (!estado) {
            throw generateErrorUtils(400, "DATA_MISSING", "Faltan datos");
        }

        const reserva = await getReservaByIdService(id_res);

        if (!reserva) {
            throw generateErrorUtils(
                404,
                "RESERVA_NOT_FOUND",
                "No existe la reserva"
            );
        }

        const reservaActualizada = await editAceptarRechazarReservasService({
            id: id_res,
            estado,
        });

        res.status(200).send({
            status: "ok",
            message: "Reserva actualizada correctamente",
            data: { reservaActualizada },
        });
    } catch (error) {
        next(error);
    }
};
