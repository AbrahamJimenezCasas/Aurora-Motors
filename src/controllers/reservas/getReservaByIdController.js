import { getReservaByIdService } from "../../services/reservas/getReservaByIdService.js";
import { generateErrorUtils } from "../../utils/helpersUtils.js";

export const getReservaByIdController = async (req, res, next) => {
    try {
        const { id_reserva } = req.params;

        const reserva = await getReservaByIdService(id_reserva);

        if (!reserva) {
            throw generateErrorUtils(
                404,
                "RESERVA_NOT_FOUND",
                "No existe la reserva"
            );
        }

        res.status(200).send({
            status: "success",
            message: "Reserva obtenida",
            data: { reserva },
        });
    } catch (error) {
        next(error);
    }
};
