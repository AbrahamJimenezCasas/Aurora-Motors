import { getReservaByCocheIdService } from "../../services/reservas/getReservaByCocheIdService.js";

export const getReservaByCocheIdController = async (req, res, next) => {
    try {
        const { id } = req.articulo;

        const solicitudes = await getReservaByCocheIdService(id);

        res.status(200).send({
            status: "success",
            message: "Histórico de reservas obtenido con éxito",
            data: { solicitudes },
        });
    } catch (error) {
        next(error);
    }
};
