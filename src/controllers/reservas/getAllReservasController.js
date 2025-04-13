import { getAllReservasService } from "../../services/reservas/getAllReservasService.js";

export const getAllReservasController = async (req, res, next) => {
    try {
        const reservas = await getAllReservasService();
        res.status(200).send({
            status: "success",
            message: "Lista de reservas encontradas",
            data: { reservas },
        });
    } catch (error) {
        next(error);
    }
};
