import { getReservasByUserIdService } from "../../services/reservas/getReservasByUserIdService.js";

export const getReservasByUserIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const reservas = await getReservasByUserIdService(id);
        res.status(200).send({
            status: "success",
            message: "Histórico de reservas obtenido con éxito",
            data: { reservas },
        });
    } catch (error) {
        next(error);
    }
};
